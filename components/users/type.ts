export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;

  dateOfBirth?: string;
  gender?: string;

  heightCm?: number;
  weightKg?: number;

  avatar?: string;

  lastLogin?: string;
  createdAt?: string;
};