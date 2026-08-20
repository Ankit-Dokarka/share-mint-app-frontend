import { apiRequest } from "../request";
import type { ProfileResponse } from "../../types/user";

export const profileAPI = {
  async getProfile() {
    return apiRequest<ProfileResponse>({
      method: "GET",
      url: "/api/users/profile",
    });
  },

  async updateProfile(fullName: string) {
    return apiRequest<ProfileResponse>({
      method: "PATCH",
      url: "/api/users/profile",
      data: { fullName },
    });
  },

  async updateAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);

    return apiRequest<ProfileResponse>({
      method: "PUT",
      url: "/api/users/avatar",
      data: formData,
    });
  },
};