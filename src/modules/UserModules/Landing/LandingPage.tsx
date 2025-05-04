import { Box, Grid, Typography, Container } from "@mui/material";
import img1 from "../../../assets/images/image 3.png";
import img2 from "../../../assets/images/_.jpeg";
import img3 from "../../../assets/images/_ (1).jpeg";
import BookingBox from "../../../shared/BookingBox/BookingBox";
import {
  PORTAL_ADS_URLS,
  PORTAL_ROOMS_URLS,
} from "../../../services/api/apiConfig";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import React, { useEffect, useState } from "react";
import RoomCardItem from "../../../shared/RoomCardItem/RoomCardItem";
import TestimonialSlider from "../../../shared/TestimonialSlider/TestimonialSlider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LandingPage: React.FC = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [currentImage, setCurrentImage] = useState<string>(img1);

  useEffect(() => {
    const images = [img1, img2, img3];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getAdsProduct = async () => {
    try {
      const response = await privateAxiosInstance.get(PORTAL_ADS_URLS.GET_ADS);
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
      setRooms(response.data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const addsGroup = Array.isArray(ads) ? ads.slice(0, 6) : [];
  const secondaddsGroup = Array.isArray(ads) ? ads.slice(4, 8) : [];
  const roomsGroup = Array.isArray(rooms) ? rooms.slice(0, 4) : [];
  const secondroomsGroup = Array.isArray(rooms) ? rooms.slice(4, 8) : [];

  useEffect(() => {
    getAdsProduct();
    getRoomsProduct();
  }, []);

  const { t } = useTranslation();

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="xl" sx={{ margin: "auto" }}>
        <Grid
          container
          alignItems="center"
          spacing={20}
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              gutterBottom
              fontSize={50}
              color="#152C5B"
              letterSpacing={1}
              fontWeight="600"
              maxWidth="600px"
            >
              {t("landing_page.Forget Busy Work,Start Next Vacation")}
            </Typography>
            <Typography variant="body1" color="gray" width="600px">
              {t(
                "landing_page.We provide what you need to enjoy your holiday with family.Time to make another memorable moments."
              )}
            </Typography>
            <BookingBox />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={currentImage}
              alt="Room Booking"
              sx={{
                width: { xs: "100%", sm: 400, md: 500 },
                height: { xs: 250, sm: 300, md: 500 },
                objectFit: "cover",
                mx: { xs: "auto", md: "0" },
                borderRadius: "5rem 1rem 1rem 1rem",
                border: "5px solid #152C5B",
                marginRight: "20px",
                marginBottom: "20px",
                boxSizing: "border-box",
                display: "block",
                padding: "10px",
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop="10rem">
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 1, minWidth: { md: "50%" } }}>
              {addsGroup[0] && (
                <RoomCardItem
                  image={addsGroup[0]?.room?.images?.[0] || ""}
                  title={addsGroup[0]?.room?.roomNumber || "No Title"}
                  price={addsGroup[0]?.room?.price || 0}
                  width="100%"
                  height={{ xs: 300, md: 400 }}
                />
              )}
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 2,
                minWidth: { md: "50%" },
              }}
            >
              {addsGroup.slice(1, 5).map((ad, index) => (
                <Box key={index} sx={{ flexGrow: 1 }}>
                  <RoomCardItem
                    image={ad?.room?.images?.[0] || ""}
                    title={ad?.room?.roomNumber || "No Title"}
                    price={ad?.room?.price || 0}
                    width="100%"
                    height={{ xs: 150, sm: 190 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: "4rem", mb: "2rem" }}
        >
          <Typography variant="h4">
            {t("landing_page.Houses with beauty backyard")}
          </Typography>
          <Link
            to="/explor"
            style={{
              textDecoration: "none",
              color: "red",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t("landing_page.more")}
          </Link>
        </Grid>

        <Grid container spacing={2}>
          {roomsGroup.map((room, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ flexGrow: 1 }}>
              <RoomCardItem
                image={room.images[0]}
                title={room.roomNumber}
                price={room.price}
                width="100%"
                height={215}
              />
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: "4rem", mb: "2rem" }}
        >
          <Typography variant="h4">
            {t("landing_page.Hotels with large living room")}
          </Typography>
          <Link
            to="/explor"
            style={{
              textDecoration: "none",
              color: "red",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t("landing_page.more")}
          </Link>
        </Grid>

        <Grid container spacing={2}>
          {secondroomsGroup.map((room, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ flexGrow: 1 }}>
              <RoomCardItem
                image={room.images[0]}
                title={room.roomNumber}
                price={room.price}
                width="100%"
                height={215}
              />
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: "4rem", mb: "2rem" }}
        >
          <Typography variant="h4">{t("landing_page.ads")}</Typography>
          <Link
            to="/explor"
            style={{
              textDecoration: "none",
              color: "red",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t("landing_page.more")}
          </Link>
        </Grid>

        <Grid container spacing={2}>
          {secondaddsGroup.map((ad, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ flexGrow: 1 }}>
              <RoomCardItem
                image={ad.room.images[0]}
                title={ad.room.roomNumber}
                price={ad.room.price}
                width="100%"
                height={215}
              />
            </Grid>
          ))}
        </Grid>

        <TestimonialSlider />
      </Container>
    </Box>
  );
};


export default LandingPage;
