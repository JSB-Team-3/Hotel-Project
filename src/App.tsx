import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MasterLayout from './modules/shared/MasterLayout/MasterLayout'
import Login from './modules/Authentication/Login/Login'
import ForgetPass from './modules/Authentication/ForgetPass/ForgetPass';
import ResetPass from './modules/Authentication/ResetPass/ResetPass';
import VerifyAccount from './modules/Authentication/VerifyAccount/VerifyAccount';
import Register from './modules/Authentication/Register/Register';
import NotFound from './modules/shared/NotFound/NotFound'
import AuthLayout from './modules/shared/AuthLayout/AuthLayout'
import RoomsList from './modules/Rooms/RoomsList/RoomsList';
import RoomsData from './modules/Rooms/RoomsData/RoomsData';
import BookingList from './modules/Booking/BookingList';
import UsersList from './modules/UsersList/UsersList';
import Dashboard from './modules/Dashboard/Dashboard';
import ProtectedRoute from './modules/shared/ProtectedRoute/ProtectedRoute';
import Ads from './modules/Ads/Ads'

function App() {
const routes=createBrowserRouter([
  {path:"",element:<AuthLayout/>,errorElement:<NotFound/>,
    children:[
      {index:true,element:<Login/>},
      {path:"login",element:<Login/>},
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
      ]
    }
])

  return (
  <RouterProvider router={routes}/>
  )
}

export default App
