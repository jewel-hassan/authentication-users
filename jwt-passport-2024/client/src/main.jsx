import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ErrorPage from './components/error-page';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:"/login",
        element:<Login/>,
      },
      {
        path:"/register",
        element:<Register/>,
      },
      {
        path:"/profile",
        element:<Profile/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
