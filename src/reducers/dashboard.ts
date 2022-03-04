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
    saveUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    clearUserInfo: (state) => {
      state.user = {};
    },
  },
});

export const { saveUserInfo, clearUserInfo } = dashboardSlice.actions;

export default dashboardSlice.reducer;
