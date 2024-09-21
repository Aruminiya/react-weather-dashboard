import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "../pages/HomePage.tsx";
import About from "../pages/About.tsx";
import CountryList from "../pages/CountryList.tsx";
import Recharts from "../pages/Recharts.tsx";

const router = createBrowserRouter([
  {
    path: 'react-weather-dashboard/',
    element: <HomePage />,
  },
  {
    path: 'react-weather-dashboard/about',
    element: <About />,
  },
  {
    path: 'react-weather-dashboard/countryList',
    element: <CountryList />,
  },
  {
    path: 'react-weather-dashboard/recharts',
    element: <Recharts />,
  }

]);

export default function Router() {
  return <RouterProvider router={router} />
}
