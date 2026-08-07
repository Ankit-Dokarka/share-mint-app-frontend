export const BASE_URL = import.meta.env.VITE_API_URL;

export const authAPI = {
  async googleLogin(idToken: string) {
    const response = await fetch(`${BASE_URL}/api/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
  async logout(): Promise<void> {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
  },
  async checkAuth() {
    const response = await fetch(`${BASE_URL}/api/auth/check`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
  async getProfile() {
    const response = await fetch(`${BASE_URL}/api/users/profile`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
};
