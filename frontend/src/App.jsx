import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PageNotFound from "./components/PageNotFound";
import {Toaster} from 'react-hot-toast';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot/password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset/password/:token",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
      <div>
        <Toaster position="top-center" reverseOrder='false'></Toaster>
          <RouterProvider router={router} />
      </div>
  )
};

export default App;
