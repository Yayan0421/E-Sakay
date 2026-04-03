import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Frontpage from "./pages/Frontpage";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Terms from "./components/login/terms";
import Privacy from "./components/login/privacy";
import DashboardLayout from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import BookingPage from "./components/dashboard/BookingPage";
import Messages from "./pages/dashboard/Messages";
import RidesHistory from "./pages/dashboard/RidesHistory";
import Transactions from "./pages/dashboard/Transactions";
import Support from "./pages/dashboard/Support";
import AboutUs from "./pages/dashboard/AboutUs";
import Profile from "./pages/dashboard/Profile";
import LiveMapPage from "./pages/dashboard/LiveMap";
import Tracking from "./pages/dashboard/Tracking";
import PaymentConfirm from "./pages/PaymentConfirm";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";

const router = createBrowserRouter(
  [
    { path: "/", element: <Frontpage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/terms", element: <Terms /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/payment-confirm", element: <PaymentConfirm /> },
    {
      path: "/dashboard",
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "booking", element: <BookingPage /> },
        { path: "messages", element: <Messages /> },
        { path: "rides", element: <RidesHistory /> },
        { path: "transactions", element: <Transactions /> },
        { path: "livemap", element: <LiveMapPage /> },
        { path: "tracking", element: <Tracking /> },
        { path: "support", element: <Support /> },
        { path: "about", element: <AboutUs /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ],
  { future: { v7_startTransition: true, v7_relativeSplatPath: true } }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;