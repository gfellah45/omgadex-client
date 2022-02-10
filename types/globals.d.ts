interface Iuser {
  _id: string;
  email: string;
  isAdmin: boolean;
  phone: string;
}

interface IuserModel {
  loginToken?: string;
  refreshToken?: string;
  user: Iuser;
}
type UserLogin = {
  email?: string;
  password?: string;
  code?: string;
};

type CreateUser = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  terms: boolean;
  country: string;
};

type User = {
  _id: string;
  email: string;
  isAdmin: boolean;
  phone: string;
  address: T extends Object ? T : any;
  loginToken?: string;
  refreshToken?: string;
};

type UserResponse = {
  message: string;
  payload: {
    user: User;
    loginToken: string;
    refreshToken?: string;
  };
  error?: UserResponseError;
};

type UserResponseError = {
  status: number;
  data: {
    message: string;
  };
};

type VerifyUser = {
  email: string;
  code: string;
};

type UiInterface = {
  showModal: boolean;
  modalType?: string;
  modalProps?: T extends Object ? T : any;
};
