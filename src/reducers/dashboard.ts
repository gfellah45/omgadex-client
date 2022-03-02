import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDashboardState {
  user: UserInfo | null;
}

const initialState: UserDashboardState = {
  user: {
    message: "",
    payload: {
      userDetails: {
        firstName: "",
        lastName: "",
      },
      currentCryptoPrices: {
        BTC: {
          price: "",
          amountEquivalentInUsd: 0,
          amount: 0,
          price_change_percentage_24h: 0,
          marketCapUSD: 0,
          trend: "",
        },
        ETH: {
          price: "",
          amountEquivalentInUsd: 0,
          amount: "",
          price_change_percentage_24h: 0,
          marketCapUSD: 0,
          trend: "",
        },
        XRP: {
          price: "",
          amountEquivalentInUsd: 0,
          amount: "",
          price_change_percentage_24h: 0,
          marketCapUSD: 0,
          trend: "",
        },
        BNB: {
          price: "",
          amountEquivalentInUsd: 0,
          amount: "",
          price_change_percentage_24h: 0,
          marketCapUSD: 0,
          trend: "",
        },
      },
      recentTransactions: [],
      walletInfo: {
        balance: 0,
        equivalentBTC: 0,
      },
    },
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    saveUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload;
    },
    clearUserInfo: (state) => {
      state.user = null;
    },
  },
});

export const { saveUserInfo, clearUserInfo } = dashboardSlice.actions;

export default dashboardSlice.reducer;
