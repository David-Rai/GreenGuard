
import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import { SocketProvider } from './socket/SocketContext'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home'
import Signup from './components/auth/Signup'
import Signin from './components/auth/Signin'
import Map from './components/Map'
import { UserProvider } from './socket/UserContext'
import Profile from './components/Profile'
import Report from './components/Report'
import ReportDetails from './components/ReportDetails'
import User_Reports from './components/User_Reports'
import Saved_Reports from './components/Saved_Reports'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/map",
    element: <Map />
  }
  ,
  {
    path: "/report",
    element: <Report />
  },
  {
    path: "/report-details",
    element: <ReportDetails />
  },
  {
    path: "/profile/:username",
    element: <Profile />,
    children: [
      {
        index: true,
        element: <User_Reports />
      }, {
        path: 'user_reports',
        element: <User_Reports />
      }, {
        path: "saved_reports",
        element: <Saved_Reports />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <UserProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </UserProvider>
  </SocketProvider>

)
