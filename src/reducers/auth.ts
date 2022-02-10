import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthInterface {
  user: User;
  isAuthenticated: boolean;
  token: string;
  refreshToken?: string;
}

const initialState: AuthInterface = {
  user: {
    _id: "",
    email: "",
    isAdmin: false,
    phone: "",
    address: "",
  },
  isAuthenticated: false,
  token: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action: PayloadAction<User>) => ({
      ...state,
      user: action.payload,
      isAuthenticated: true,
    }),
    logout: (state) => ({
      ...state,
      user: {} as User,
    }),
    registerToken: (
      state,
      action: PayloadAction<{ loginToken: string; refreshToken?: string }>
    ) => ({
      ...state,
      token: action.payload.loginToken,
      refreshToken: action.payload.refreshToken,
    }),
  },
});

export const { login, logout, registerToken } = authSlice.actions;

export default authSlice.reducer;
