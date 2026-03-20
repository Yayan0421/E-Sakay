import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import DashboardLayout from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Messages from "./pages/dashboard/Messages";
import RidesHistory from "./pages/dashboard/RidesHistory";
import Support from "./pages/dashboard/Support";
import AboutUs from "./pages/dashboard/AboutUs";

const router = createBrowserRouter(
  [
    { path: "/", element: <Frontpage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "messages", element: <Messages /> },
        { path: "rides", element: <RidesHistory /> },
        { path: "support", element: <Support /> },
        { path: "about", element: <AboutUs /> },
      ],
    },
  ],
  { future: { v7_startTransition: true, v7_relativeSplatPath: true } }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;