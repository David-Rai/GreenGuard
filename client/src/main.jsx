
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
import Report from './components/Report'
import ReportDetails from './components/ReportDetails'

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
  }
])

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <RouterProvider router={router}>
    </RouterProvider>
  </SocketProvider>

)
