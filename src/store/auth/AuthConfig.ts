
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import roomsReducer from "../rooms/roomsSlice";
import facilitiesReducer from "../facilities/facilitiesSlice";
import bookingsReducers from "../booking/bookingsSlice";
import adsReducers from "../ads/adsSlice";
import usersReducers from "../users/userSlice";
import commentsReducer from "../comments/commentSlice";
import reviewReducer from "../review/reviewsSlice";
import chartReducer from "../chart/chartSlice";
import themeReducer from '../slices/themeSlice';
import favouriteReducer from '../favourites/favouritesSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    facilities: facilitiesReducer,
    bookings: bookingsReducers,
    ads: adsReducers,
    users: usersReducers,
    chart: chartReducer,
    comments: commentsReducer,
    reviews: reviewReducer,
    theme: themeReducer,
    favourites:favouriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
