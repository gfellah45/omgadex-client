interface Iuser {
  _id: string;
  email: string;
  isAdmin: boolean;
  phone: string;
}

interface IuserModel {
  token: string;
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
  address: string;
};

type UserResponse = {
  message: string;
  payload: {
    token: string;
    user: User;
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
