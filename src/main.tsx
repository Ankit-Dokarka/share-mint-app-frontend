import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import { GroupsProvider } from "./context/groups/GroupProvider.tsx";
import { ExpenseProvider } from "./context/expense/ExpenseProvider.tsx";
import { ThemeProvider } from "./context/theme/ThemeProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <AuthProvider>
          <GroupsProvider>
            <ExpenseProvider>
              <App />
            </ExpenseProvider>
          </GroupsProvider>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
