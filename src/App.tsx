
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MasterLayout from './shared/MasterLayout/MasterLayout';
import NotFound from './shared/NotFound/NotFound';
import './App.css'
import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute';
import Ads from './modules/AdminModules/Ads/Ads'
import AuthLayout from './shared/AuthLayout/AuthLayout';
import FacilitiesList from './modules/AdminModules/Facilities/FacilitiesList/FacilitiesList';
import Spiner from './shared/Spinner/Spiner';
import LandingPage from './modules/UserModules/Landing/LandingPage';
import UserLayout from './shared/UserLayout/UserLayout';



// Lazy-load your components
const Login = React.lazy(() => import('./modules/AdminModules/Authentication/Login/Login'));
const Register = React.lazy(() => import('./modules/AdminModules/Authentication/Register/Register'));
const ForgetPass = React.lazy(() => import('./modules/AdminModules/Authentication/ForgetPass/ForgetPass'));
const ResetPass = React.lazy(() => import('./modules/AdminModules/Authentication/ResetPass/ResetPass'));
const VerifyAccount = React.lazy(() => import('./modules/AdminModules/Authentication/VerifyAccount/VerifyAccount'));
const Dashboard = React.lazy(() => import('./modules/AdminModules/Dashboard/Dashboard'));
const RoomsList = React.lazy(() => import('./modules/AdminModules/Rooms/RoomsList/RoomsList'));
const RoomsData = React.lazy(() => import('./modules/AdminModules/Rooms/RoomsData/RoomsData'));
const BookingList = React.lazy(() => import('./modules/AdminModules/Booking/BookingList'));
const UsersList = React.lazy(() => import('./modules/AdminModules/UsersList/UsersList'));
const RoomDetails = React.lazy(() => import('./modules/UserModules/RoomDetails/RoomDetails'));
const Explore = React.lazy(() => import('./modules/UserModules/Explore/Explore'));
const Favourites = React.lazy(() => import('./modules/UserModules/Favourites/Favourites'));
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
        {path:"ads",element:<Ads/>},
        {path:"facilities",element:<FacilitiesList/>},
      ]
    },
    {path:"home" ,element:<UserLayout/>,errorElement:<NotFound/>,
      children:[
      {index:true,element:<LandingPage/>},
      {path:"rooms/:roomId",element:<RoomDetails/>},
      {path:'explore',element:<Explore/>},
      {path:'favourites',element:<Favourites/>},
    ]
    }
])


  return (
    <Suspense fallback={<Spiner height='100vh'/>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
};

export default App;
