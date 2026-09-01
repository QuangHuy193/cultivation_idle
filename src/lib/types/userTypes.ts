// user và signin, signup

export interface User {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  token: string;
}