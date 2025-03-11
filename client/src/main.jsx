import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/login.jsx'
import NotFound from './pages/NotFound.jsx'
import DeviceMangement from './pages/DeviceMangement.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    errorElement: <NotFound/>,
    children:[]
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path:"register",
    element: <Register/>
  },
  {
    path:"devices",
    element:<DeviceMangement/>
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
