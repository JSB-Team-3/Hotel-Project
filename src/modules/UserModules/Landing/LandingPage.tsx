import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Container, useTheme } from "@mui/material";
import img1 from "../../../assets/images/image 3.png";
import img2 from "../../../assets/images/_.jpeg";
import img3 from "../../../assets/images/_ (1).jpeg";
import BookingBox from "../../../shared/BookingBox/BookingBox";
import {
  PORTAL_ADS_URLS,
  PORTAL_ROOMS_URLS,
} from "../../../services/api/apiConfig";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import RoomCardItem from "../../../shared/RoomCardItem/RoomCardItem";
import TestimonialSlider from "../../../shared/TestimonialSlider/TestimonialSlider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/system";

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [ads, setAds] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [currentImage, setCurrentImage] = useState<string>(img1);
  const isMobile   =useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const primaryColor = theme.palette.primary?.main || "#152C5B";
  const secondaryTextColor = theme.palette.text?.secondary || "gray";
  const borderColor = theme.custom?.darkblue || primaryColor;

  useEffect(() => {
    const images = [img1, img2, img3];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getAdsProduct = async () => {
      try {
        const response = await privateAxiosInstance.get(PORTAL_ADS_URLS.GET_ADS);
        console.log(response.data.data.ads, "ads");
        
        setAds(response.data.data.ads);
      } catch (error) {
        console.log(error);
      }
    };

    const getRoomsProduct = async () => {
      try {
        const response = await privateAxiosInstance.get(
          PORTAL_ROOMS_URLS.GET_ALL_ROOMS_ALL
        );
        console.log(response.data.data.rooms, "rooms");
        
        setRooms(response.data.data.rooms);
      } catch (error) {
        console.log(error);
      }
    };

    getAdsProduct();
    getRoomsProduct();
  }, []);

  const addsGroup = ads.slice(0, 6);
  const secondaddsGroup = ads.slice(4, 8);
  const roomsGroup = rooms.slice(0, 4);
  const secondroomsGroup = rooms.slice(4, 8);

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="xl">
        <Grid
          container
          gap={isSmallScreen? 0:isMobile? 1:isLargeScreen?10:0}
          alignItems="center"
          direction={{ xs: "column-reverse", md: "row" }}
          justifyContent="center"
        >
          <Grid size={{ xs: 12,  md: 6 }}>
            <Typography
              variant="h4"
              gutterBottom
              fontSize={50}
              color={primaryColor}
              letterSpacing={1}
              fontWeight={600}
              maxWidth="600px"
              sx={{mx:{xs:"auto",md:0}}}
              textAlign="center"
            >
              {t("landing_page.Forget Busy Work,Start Next Vacation")}
            </Typography>
            <Typography
              variant="body1"
              color={secondaryTextColor}
              width="100%"
            >
              {t(
                "landing_page.We provide what you need to enjoy your holiday with family.Time to make another memorable moments."
              )}
            </Typography>
            <BookingBox />
          </Grid>

          <Grid  size={{ xs: 12, md: 6 }} sx={{textAlign:"center"}}>
            <Box
              component="img"
              src={currentImage}
              alt="Room Booking"
              sx={{
                width: { xs: "100%", sm: 400, md: 450 },
                height: { xs: 250, sm: 400, md: 500 },
                objectFit: "cover",
                mx: { xs: "auto", md: 0 },
                borderRadius: "5rem 1rem 1rem 1rem",
                border: `5px solid ${borderColor}`,
                mb: "20px",
                padding: "10px",
              }}
            />
          </Grid>
        </Grid>

        {/* Ads Grid */}
        <Grid container spacing={2} mt="10rem">
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              {addsGroup[0] && (
                <RoomCardItem
                  image={addsGroup[0]?.room?.images?.[0] || ""}
                  title={addsGroup[0]?.room?.roomNumber || "No Title"}
                  price={addsGroup[0]?.room?.price || 0}
                  width="100%"
                  height={{ xs: 300, md: 400 }}
                  id={addsGroup[0]?._id}
                />
              )}
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              {addsGroup.slice(1, 5).map((ad, index) => (
                <Box key={index}>
                  <RoomCardItem
                    image={ad?.room?.images?.[0] || ""}
                    title={ad?.room?.roomNumber || "No Title"}
                    price={ad?.room?.price || 0}
                    width="100%"
                    height={{ xs: 150, sm: 190 }}
                    id={ad?._id}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Sections for Rooms/Ads */}
        {[ 
          {
            title: t("landing_page.Houses with beauty backyard"),
            items: roomsGroup,
          },
          {
            title: t("landing_page.Hotels with large living room"),
            items: secondroomsGroup,
          },
          {
            title: t("landing_page.ads"),
            items: secondaddsGroup,
          },
        ].map((section, i) => (
          <React.Fragment key={i}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: "4rem", mb: "2rem" }}
            >
              <Typography variant="h4">{section.title}</Typography>
              <Link
                to="/explor"
                style={{
                  textDecoration: "none",
                  color: theme.palette.error.main || "red",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {t("landing_page.more")}
              </Link>
            </Grid>

            <Grid container spacing={2}>
              {section.items.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <RoomCardItem
                    image={item.room?.images?.[0] || item.images?.[0] || ""}
                    title={item.room?.roomNumber || item.roomNumber || "No Title"}
                    price={item.room?.price || item.price || 0}
                    width="100%"
                    height={215}
                    id={item._id}
                  />
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        ))}

        <TestimonialSlider />
      </Container>
    </Box>
  );
};

export default LandingPage;
