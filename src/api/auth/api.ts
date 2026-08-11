export type AuthResponse = {
  success: boolean;
  message: string;
  user?: {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type User = {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const BASE_URL = import.meta.env.VITE_API_URL;

export const authAPI = {
  async googleLogin(idToken: string) {
    const response = await fetch(`${BASE_URL}/api/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  async logout(): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
  },

  async checkAuth() {
    const response = await fetch(`${BASE_URL}/api/auth/check`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  // --- NEW: Email/Password Auth ---
  async register(fullName: string, email: string, password: string) {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ fullName, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  async login(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  async verifyEmail(email: string, otp: string) {
    const response = await fetch(`${BASE_URL}/api/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  async resendOTP(email: string) {
    const response = await fetch(`${BASE_URL}/api/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },

  async getProfile() {
    const response = await fetch(`${BASE_URL}/api/users/profile`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  },
};
