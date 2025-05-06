import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Link,
} from "@mui/material";
import PaymentsIcon from '@mui/icons-material/Payments';
import { styled, useTheme } from "@mui/material/styles";
import { baseURL, BOOKING_URLS } from "../../../services/api/apiConfig";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/auth/AuthConfig";
import { getRoomsDetails } from "../../../store/rooms/roomsThunk";
import { useSnackbar } from "notistack";
import { Link as RouterLink } from "react-router-dom";
import RoomBreadcrumbs from "../../../shared/UserComponent/Breadcrumb/Breadcrumb";

// Types
interface Room {
  _id: string;
  roomNumber: string;
}

interface Booking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: {
    _id: string;
  };
  room: string;
  status: "pending" | "completed";
  createdAt: string;
  updatedAt: string;
  stripeChargeId?: string;
}

interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    myBooking: Booking[];
    totalCount: number;
  };
}



interface StyledChipProps {
  status: "pending" | "completed";
}

const StyledChip = styled(Chip)<StyledChipProps>(({ status }) => ({
  fontWeight: "bold",
  backgroundColor: status === "completed" ? "#E7F6E7" : "#FFF8E6",
  color: status === "completed" ? "#2E7D32" : "#ED6C02",
}));

// Format date function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Main component
const UserBookings: React.FC = () => {
           const theme = useTheme();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [roomDetails, setRoomDetails] = useState<Record<string, Room>>({});
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const breadCrumbsLinks = [
    { label: t('sidebar.home'), to: '/home' },
    { label: t('userBooking.My Bookings'), to: `/home/user-booking` },
  ];

  useEffect(() => {
    const fetchBookings = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await privateAxiosInstance.get<BookingResponse>(
          `${baseURL}${BOOKING_URLS.GET_USER_BOKING}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setBookings(response.data.data.myBooking);
          setTotalCount(response.data.data.totalCount);

          // Fetch room details for all bookings
          const roomIds = response.data.data.myBooking.map(
            (booking) => booking.room
          );
          
          // Fetch room details for each unique room ID
          const uniqueRoomIds = [...new Set(roomIds)];
          for (const roomId of uniqueRoomIds) {
            await fetchRoomDetails(roomId);
          }
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        enqueueSnackbar(t("userBooking.error_fetching_bookings"), { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [page, rowsPerPage, dispatch, enqueueSnackbar, t]);

  const handleChangePage = (_event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchRoomDetails = async (roomId: string): Promise<void> => {
    try {
      const { data } = await dispatch(getRoomsDetails(roomId)).unwrap();
      if (!data?.room) throw new Error(t("room_details.fetch_error"));
      
      // Update roomDetails state with the new room data
      setRoomDetails(prevDetails => ({
        ...prevDetails,
        [roomId]: data.room
      }));
    } catch (error) {
      enqueueSnackbar(
        (error as Error).message || t("room_details.fetch_error"),
        { variant: "error" }
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Enhanced Title */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #1976d2, #4dabf5)",
              borderRadius: "2px",
            },
          }}
        >
          {t("userBooking.My Bookings")}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 2, color: "text.secondary", maxWidth: "600px", mx: "auto" }}
        >
          {t("userBooking.View and manage all your current and past bookings in one place")}
        </Typography>
      </Box>
      <RoomBreadcrumbs links={breadCrumbsLinks} />
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Premium Summary Cards */}
          <Box sx={{ mb: 6 }}>
            <Grid container spacing={3} justifyContent="center">
              {/* Total Bookings Card */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    transition:
                      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  {/* Decorative Elements */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)",
                      zIndex: 1,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -30,
                      left: -30,
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, rgba(25, 118, 210, 0.08) 0%, rgba(25, 118, 210, 0.03) 100%)",
                      zIndex: 1,
                    }}
                  />

                  <CardContent sx={{ p: 3, position: "relative", zIndex: 2, backgroundColor:theme.custom.primaryCard }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, rgba(25, 118, 210, 0.2) 0%, rgba(25, 118, 210, 0.1) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <PersonIcon
                          sx={{ color: "primary.main", fontSize: 28 }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {t("userBooking.TOTAL BOOKINGS")}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="flex-end" mb={1}>
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{
                          fontWeight: 800,
                          color: "primary.main",
                          lineHeight: 1,
                          mr: 1,
                          background:
                            "linear-gradient(135deg, #1976d2 0%, #4dabf5 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 2px 4px rgba(25, 118, 210, 0.15)",
                        }}
                      >
                        {totalCount}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "text.secondary",
                          mb: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        {t("userBooking.bookings")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 3,
                        pt: 2,
                        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                            mr: 1,
                          }}
                        />
                        {t("userBooking.Last updated")}: {new Date().toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Completed Bookings Card */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(46, 125, 50, 0.08)",
                    transition:
                      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 35px rgba(46, 125, 50, 0.12)",
                    },
                  }}
                >
                  {/* Decorative Elements */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 120,
                      height: 120,
                      background:
                        "linear-gradient(45deg, rgba(135, 237, 2, 0.1) 0%, rgba(68, 237, 2, 0.05) 100%)",
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                  />

                  <CardContent sx={{ p: 3, position: "relative", zIndex: 2, backgroundColor:theme.custom.primaryCard }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, rgba(46, 125, 50, 0.32) 0%, rgba(46, 125, 50, 0.1) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <CheckCircleIcon
                          sx={{ color: "#2E7D32", fontSize: 28 }}
                        />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {t("userBooking.COMPLETED")}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="flex-end" mb={1}>
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{
                          fontWeight: 800,
                          lineHeight: 1,
                          mr: 1,
                          background:
                            "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 2px 4px rgba(46, 125, 50, 0.15)",
                        }}
                      >
                        {
                          bookings.filter(
                            (booking) => booking.status === "completed"
                          ).length
                        }
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "text.secondary",
                          mb: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        {t("userBooking.successful stays")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 3,
                        pt: 2,
                        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "#2E7D32",
                              mr: 1,
                            }}
                          />
                          {t("userBooking.Success rate")}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 600,
                            color: "#2E7D32",
                          }}
                        >
                          {totalCount > 0
                            ? (
                                (bookings.filter(
                                  (booking) => booking.status === "completed"
                                ).length /
                                  totalCount) *
                                100
                              ).toFixed(0)
                            : 0}
                          %
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Pending Bookings Card */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(237, 108, 2, 0.08)",
                    transition:
                      "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 35px rgba(237, 108, 2, 0.12)",
                    },
                  }}
                >
                  {/* Decorative Elements */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, rgba(237, 108, 2, 0.1) 0%, rgba(237, 108, 2, 0.05) 100%)",
                      zIndex: 1,
                    }}
                  />

                  <CardContent sx={{ p: 3, position: "relative", zIndex: 2 , backgroundColor:theme.custom.primaryCard }}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(135deg, rgba(237, 108, 2, 0.2) 0%, rgba(237, 108, 2, 0.1) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <PendingIcon sx={{ color: "#ED6C02", fontSize: 28 }} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {t("userBooking.PENDING")}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="flex-end" mb={1}>
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{
                          fontWeight: 800,
                          lineHeight: 1,
                          mr: 1,
                          background:
                            "linear-gradient(135deg, #ED6C02 0%, #FF9800 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 2px 4px rgba(237, 108, 2, 0.15)",
                        }}
                      >
                        {
                          bookings.filter(
                            (booking) => booking.status === "pending"
                          ).length
                        }
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "text.secondary",
                          mb: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        {t("userBooking.upcoming stays")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 3,
                        pt: 2,
                        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: "#ED6C02",
                              mr: 1,
                            }}
                          />
                          {t("userBooking.Of total bookings")}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 600,
                            color: "#ED6C02",
                          }}
                        >
                          {totalCount > 0
                            ? (
                                (bookings.filter(
                                  (booking) => booking.status === "pending"
                                ).length /
                                  totalCount) *
                                100
                              ).toFixed(0)
                            : 0}
                          %
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Bookings Table (Updated) */}
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflow: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
           <Table>
  <TableHead sx={{ bgcolor: theme.custom.tableBg}}>
    <TableRow>
      <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        {t("Room")}
      </TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        {t("Total Price")}
      </TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        {t("Start Date")}
      </TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        {t("End Date")}
      </TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        {t("Status")}
      </TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {bookings.map((booking) => (
      <TableRow
        key={booking._id}
        sx={{
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.04)",
          },
          transition: "background-color 0.3s",
        }}
      >
        <TableCell sx={{ textAlign: "center" }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <MeetingRoomIcon
              sx={{ mr: 1, color: "primary.main" }}
              fontSize="small"
            />
            <Typography variant="body1">
              {roomDetails[booking.room]?.roomNumber || t("Loading...")}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <AttachMoneyIcon
              sx={{ mr: 1, color: "" }}
              fontSize="small"
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
              }}
            >
              {Math.abs(booking.totalPrice).toLocaleString()}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <CalendarTodayIcon
              sx={{ mr: 1, color: "text.secondary" }}
              fontSize="small"
            />
            {formatDate(booking.startDate)}
          </Box>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <CalendarTodayIcon
              sx={{ mr: 1, color: "text.secondary" }}
              fontSize="small"
            />
            {formatDate(booking.endDate)}
          </Box>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {booking.status === "pending" ? (
              <StyledChip
                label={t("Pending")}
                status="pending"
                icon={<PendingIcon />}
                sx={{
                  paddingInline:"5px",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 2px 8px rgba(237, 108, 2, 0.25)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s",
                }}
              />
          ) : (
            <StyledChip
              label={t("Completed")}
              status="completed"
              icon={<CheckCircleIcon />}
            />
          )}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          {booking.status === "pending" &&
            <Link
              component={RouterLink}
              to={`/checkout/${booking._id}`}
              sx={{
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              <StyledChip
                label={t("pay")}
                status="completed"
                icon={<PaymentsIcon/>}
                sx={{
                  paddingInline:"5px",
                  cursor: "pointer",
                  "& .MuiChip-icon": {
                    color: "success.main" // Using theme color for better visibility in both light/dark modes
                  },
                  transition: "all 0.2s",
                }}
              />
            </Link>}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={t("Rows per page:")}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${t("of")} ${count}`
              }
            />
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default UserBookings;