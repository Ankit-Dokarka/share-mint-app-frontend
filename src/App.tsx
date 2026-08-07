import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import Recent from "./pages/Recent";
import Expenses from "./pages/Expenses";
import PublicRoute from "./routes/PublicRoute";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import VerificationRoute from "./routes/VerificationRoute";
import GoogleSignIn from "./pages/AuthTest";
import Transactions from "./pages/Transactions";
import GroupDetails from "./pages/GroupDetails";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="test" element={<GoogleSignIn />} />

        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
        </Route>

        {/* Protected Routes (Requires login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="groups" element={<Groups />} />
            <Route path="recent" element={<Recent />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />

            <Route path="groups/:groupId" element={<GroupDetails />} />
          </Route>
        </Route>

        {/* Verification Routes */}
        <Route element={<VerificationRoute />}>
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
