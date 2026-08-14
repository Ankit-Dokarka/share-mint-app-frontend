import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";

import PublicRoute from "./routes/PublicRoute";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import VerificationRoute from "./routes/VerificationRoute";

import GroupDetails from "./pages/GroupDetails";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
