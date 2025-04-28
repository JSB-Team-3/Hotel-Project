
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MasterLayout from './modules/shared/MasterLayout/MasterLayout';
import NotFound from './modules/shared/NotFound/NotFound';
import ProtectedRoute from './modules/shared/ProtectedRoute/ProtectedRoute';
import { Box, CircularProgress } from '@mui/material';
import AuthLayout from './modules/shared/AuthLayout/AuthLayout';
import FacilitiesList from './modules/Facilities/FacilitiesList/FacilitiesList';

// Lazy-load your components
const Login = React.lazy(() => import('./modules/Authentication/Login/Login'));
const Register = React.lazy(() => import('./modules/Authentication/Register/Register'));
const ForgetPass = React.lazy(() => import('./modules/Authentication/ForgetPass/ForgetPass'));
const ResetPass = React.lazy(() => import('./modules/Authentication/ResetPass/ResetPass'));
const VerifyAccount = React.lazy(() => import('./modules/Authentication/VerifyAccount/VerifyAccount'));
const Dashboard = React.lazy(() => import('./modules/Dashboard/Dashboard'));
const RoomsList = React.lazy(() => import('./modules/Rooms/RoomsList/RoomsList'));
const RoomsData = React.lazy(() => import('./modules/Rooms/RoomsData/RoomsData'));
const BookingList = React.lazy(() => import('./modules/Booking/BookingList'));
const UsersList = React.lazy(() => import('./modules/UsersList/UsersList'));

const App: React.FC = () => { 
const routes = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPass /> },
      { path: "reset-password", element: <ResetPass /> },
      { path: "verify-account", element: <VerifyAccount /> },

    ]},
    { path:'dashboard', element:<ProtectedRoute><MasterLayout/></ProtectedRoute>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Dashboard/>},
        {path:"rooms",element:<RoomsList/>},
        {path:"room-data/new-Rooms",element:<RoomsData/>},
        {path:"room-data/:roomId",element:<RoomsData/>},
        {path:"bookings",element:<BookingList/>},
        {path:"users",element:<UsersList/>},
        {path:"facilities",element:<FacilitiesList/>},

      ]
    }
])

  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      }
    >
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default App;
