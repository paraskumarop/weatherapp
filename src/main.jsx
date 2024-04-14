import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Navbar from "./Components/Navbar.jsx";
import History from "./Components/History.jsx";
import WeatherPage from "./Components/WeatherPage.jsx";
import "./index.css";
import Layout from "./Components/Layout.jsx";
import CurrentLocation from "./Components/CurrentLocation.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
      path: "/",
      element: <App/>,
      },
      {
      path: "/location",
      element: <CurrentLocation/>,
      },
      {
      path: "/weather/:cityName",
      element: <WeatherPage/>,
      },
      {
      path: "/history",
      element: <History/>,
      },

  ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
