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
  trade?: string;
  tradeProps?: T extends Object ? T : any;
  media: boolean;
};

type IRecentTrx = {
  amount: string;
  coin: string;
  date: string;
  fromAddress: string;
  toAddress: string;
  transactionId: string;
  type: string;
};

type UserInfo = {
  message: string;
  payload: {
    userDetails: {
      firstName: string;
      lastName: string;
    };
    currentCryptoPrices: {
      BTC: {
        price: string;
        amountEquivalentInUsd: number;
        amount: number;
        price_change_percentage_24h: number;
        marketCapUSD: number;
        trend: string;
      };
      ETH: {
        price: string;
        amountEquivalentInUsd: number;
        amount: string;
        price_change_percentage_24h: number;
        marketCapUSD: number;
        trend: string;
      };
      XRP: {
        price: string;
        amountEquivalentInUsd: number;
        amount: string;
        price_change_percentage_24h: number;
        marketCapUSD: number;
        trend: string;
      };
      BNB: {
        price: string;
        amountEquivalentInUsd: number;
        amount: string;
        price_change_percentage_24h: number;
        marketCapUSD: number;
        trend: string;
      };
    };
    recentTransactions: IRecentTrx[];
    walletInfo: {
      balance: number;
      equivalentBTC: number;
    };
  };
};

type ICreateVoucher = {
  amountInDollars?: number;
  amountInNaira?: number;
  rate?: number;
  email?: string;
};

type IVoucherResponse = {
  message: string;
  payload: {
    amountInDollars: number;
    amountInNaira: number;
    rate: number;
    txnRef: string;
    email?: string;
  };
};

type IInternalRates = {
  message: string;
  payload: {
    amount: string;
    currency: string;
    nairaEquivalence: string;
    _id: string;
  };
};
