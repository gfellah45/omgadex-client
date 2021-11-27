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
