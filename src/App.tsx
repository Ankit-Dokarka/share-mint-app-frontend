import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import VerificationRoute from "./routes/VerificationRoute";
import LandingPage from "./pages/LandingPage";
import useAuth from "./context/auth/AuthContext";
import { connectSocket, disconnectSocket } from "./socket/socket";

const AuthPage = lazy(() => import("./pages/Auth"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Groups = lazy(() => import("./pages/Groups"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Chat = lazy(() => import("./pages/Chat"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const GroupDetails = lazy(() => import("./pages/GroupDetails"));

const RouteLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--color-border) border-t-(--color-primary)" />
  </div>
);

export default function App() {
  const { user } = useAuth();

  useEffect(() => {
    console.log("AUTH USER:", user?._id);
    if (user && user._id) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [user && user._id]);
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="groups" element={<Groups />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="chat" element={<Chat />} />
              <Route path="groups/:groupId" element={<GroupDetails />} />
            </Route>
          </Route>

          <Route element={<VerificationRoute />}>
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
