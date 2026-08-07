export type AuthResponse = {
  success: boolean;
  message: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
};
