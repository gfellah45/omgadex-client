export type UserLogin = {
  email: string;
  password: string;
};

export type CreateUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type User = {
  _id: string;
  email: string;
  isAdmin: boolean;
  phone: string;
  address: string;
};

export type UserResponse = {
  message: string;
  payload: {
    token: string;
    user: User;
  };
  error?: UserResponseError;
};

export type UserResponseError = {
  status: number;
  data: {
    message: string;
  };
};
