import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDashboardState {
  user: Partial<UserInfo>;
}

const initialState: UserDashboardState = {
  user: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    saveUserInfo: (state: { user: any }, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    clearUserInfo: (state: { user: {} }) => {
      state.user = {};
    },
  },
});

export const { saveUserInfo, clearUserInfo } = dashboardSlice.actions;

export default dashboardSlice.reducer;
