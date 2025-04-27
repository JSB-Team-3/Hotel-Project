import { AppDispatch, RootState } from '../store/auth/AuthConfig';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import DeleteConfirmation from '../shared/DeleteConfirmation/DeleteConfirmation';
import DataTable from '../shared/DataTable/DataTable';
import { Room } from '../../Interfaces/rooms.interface';
import { StyledTableCell } from '../shared/StyledTable/StyledTable';
import TableActions from '../shared/TableActions/TableActions';
import Header from '../shared/Header/Header';
import { deleteBooking, getAllBookings, } from '../store/booking/bookingsThunk';
import { Booking } from '../../Interfaces/bookings.interfaces';
import { User } from '../../Interfaces/user.interface';
import { motion } from 'framer-motion';
import { RoomFacility } from '../../Interfaces/facilities.interface';

export default function BookingList() {
  const [itemToDeleteId, setItemToDeleteId] = useState<string>('');
  const [itemToDeleteNumber, setItemToDeleteNumber] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, bookings, deleteLoading, totalCount } = useSelector(
    (state: RootState) => ({
      loading: state.bookings.loading,
      bookings: state.bookings.bookings,
      deleteLoading: state.bookings.deleteLoading,
      totalCount: state.bookings.totalCount,
    }),
    shallowEqual
  );

  const getAllBookingsList = useCallback(async () => {
    console.log('get');
    
    try {
      await dispatch(getAllBookings({
        page: page + 1,
        size,
      })).unwrap();
    } catch (err) {
      enqueueSnackbar((err as string) || 'Failed to get all bookings', { variant: 'error' });
    }
  }, [dispatch, page, size, enqueueSnackbar]);

  useEffect(() => {
    getAllBookingsList();
  }, [getAllBookingsList]);

  const handleDeleteItem = useCallback((itemId: string, itemNumber: string) => {
    setItemToDeleteId(itemId);
    setItemToDeleteNumber(itemNumber);
    setShowDeleteModal(true);
  }, []);

  const ConfirmDelete = useCallback(async () => {
    try {
      const response = await dispatch(deleteBooking(itemToDeleteId)).unwrap();
      enqueueSnackbar(response?.message || 'Booking deleted successfully', { variant: 'success' });
      setShowDeleteModal(false);
      setItemToDeleteId('');
      setItemToDeleteNumber('');
      getAllBookingsList();
    } catch (err) {
      enqueueSnackbar((err as string) || 'Failed to delete booking', { variant: 'error' });
    }
  }, [dispatch, itemToDeleteId, enqueueSnackbar, getAllBookingsList]);

  const renderRow = useCallback((item: Room | Booking | User | RoomFacility, index: number): React.ReactNode => {
    // Type guard to check if the item is a Booking
    if ('startDate' in item && 'endDate' in item && 'totalPrice' in item && 'user' in item) {
        const booking = item as Booking;  // Type assertion to Booking

        return (
            <motion.tr
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1, y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 9,
                        delay: index * 0.20,
                        duration: 0.6
                    }
                }}
            >
                <StyledTableCell component="th" scope="row">
                    {booking.room?.roomNumber || "No room assigned"}
                </StyledTableCell>
                <StyledTableCell>
                    {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : "-"}
                </StyledTableCell>
                <StyledTableCell>
                    {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : "-"}
                </StyledTableCell>
                <StyledTableCell>{booking.totalPrice}</StyledTableCell>
                <StyledTableCell>{booking.user?.userName || "Unknown"}</StyledTableCell>
                <StyledTableCell>{booking.status}</StyledTableCell>
                <StyledTableCell>
                    <TableActions handleDeleteItem={handleDeleteItem} item={booking} route={''} />
                </StyledTableCell>
            </motion.tr>
        );
    }

    return null; // Handle other types such as Room, User, etc.
}, [handleDeleteItem]);



  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSize(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  return (
    <Box>
      <Header title="Booking" route="" />
      <DataTable
        loading={loading}
        items={bookings}
        page={page}
        size={size}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        totalCount={totalCount}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Booking per page:"
        columns={['Room Number', 'Start Date', 'End Date', 'Total Price', 'User Name', 'Status', '']}
        renderRow={renderRow}
      />
      <DeleteConfirmation
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        confirm={ConfirmDelete}
        message={`Delete This Booking ${itemToDeleteNumber}`}
        loading={deleteLoading}
      />
    </Box>
  );
}
