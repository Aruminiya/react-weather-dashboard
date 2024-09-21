import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "../pages/HomePage.tsx";
import About from "../pages/About.tsx";
import CountryList from "../pages/CountryList.tsx";
import Recharts from "../pages/Recharts.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/countryList',
    element: <CountryList />,
  },
  {
    path: '/recharts',
    element: <Recharts />,
  }

]);

export default function Router() {
  return <RouterProvider router={router} />
}
