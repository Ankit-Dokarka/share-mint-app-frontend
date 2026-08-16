import type { AuthResponse } from "../../types/auth";

export const BASE_URL = import.meta.env.VITE_API_URL;

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "An unexpected error occurred");
  }

  return data as T;
}

export const authAPI = {
  checkAuth: () => apiRequest<AuthResponse>("/api/auth/check"),

  googleLogin: (idToken: string) =>
    apiRequest<AuthResponse>("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    }),

  logout: () => apiRequest<void>("/api/auth/logout", { method: "POST" }),

  register: (fullName: string, email: string, password: string) =>
    apiRequest<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    }),

  login: (email: string, password: string) =>
    apiRequest<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  verifyEmail: (email: string, otp: string) =>
    apiRequest<AuthResponse>("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }),

  resendOTP: (email: string) =>
    apiRequest<AuthResponse>("/api/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  getProfile: () => apiRequest<AuthResponse>("/api/users/profile"),
};
