export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserRequest = CreateUserRequest;
