export const BASE_URL = import.meta.env.VITE_API_URL;

export const profileAPI = {
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

  async updateProfile(fullName: string) {
    const response = await fetch(`${BASE_URL}/api/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ fullName }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
  async updateAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`${BASE_URL}/api/users/profile/avatar`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
};
