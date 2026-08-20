import type { AuthResponse } from "../../types/auth";
import { apiRequest } from "../request";

export const authAPI = {
  checkAuth: () =>
    apiRequest<AuthResponse>({
      method: "GET",
      url: "/api/auth/check",
    }),

  googleLogin: (idToken: string) =>
    apiRequest<AuthResponse>({
      method: "POST",
      url: "/api/auth/google",
      data: { idToken },
    }),

  logout: () =>
    apiRequest<void>({
      method: "POST",
      url: "/api/auth/logout",
    }),

  register: (fullName: string, email: string, password: string) =>
    apiRequest<AuthResponse>({
      method: "POST",
      url: "/api/auth/register",
      data: { fullName, email, password },
    }),

  login: (email: string, password: string) =>
    apiRequest<AuthResponse>({
      method: "POST",
      url: "/api/auth/login",
      data: { email, password },
    }),

  verifyEmail: (email: string, otp: string) =>
    apiRequest<AuthResponse>({
      method: "POST",
      url: "/api/auth/verify-otp",
      data: { email, otp },
    }),

  resendOTP: (email: string) =>
    apiRequest<AuthResponse>({
      method: "POST",
      url: "/api/auth/resend-otp",
      data: { email },
    }),

  getProfile: () =>
    apiRequest<AuthResponse>({
      method: "GET",
      url: "/api/users/profile",
    }),
};