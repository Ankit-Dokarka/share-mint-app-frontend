export type User = {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ProfileResponse = {
  success: boolean;
  user: User;
};