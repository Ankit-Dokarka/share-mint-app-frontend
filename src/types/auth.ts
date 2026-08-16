export type User = {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  user?: User;
};
