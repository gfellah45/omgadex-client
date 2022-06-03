export interface FetchAccountDetailsError {
  status: number;
  data: {
    message: string;
    payload: null;
  };
}

export interface FetchAccountDetailsSuccess {
  bank_name: string;
  account_name: string;
  account_number: string;
  bank_code: string;
  bvn?: string;
}

export interface GetBankDetailsInterface {
  message: string;
  payload: Payload;
}

export interface BankDetail {
  accountNumber: string;
  accountName: string;
  bvn: string;
  bankName: string;
  bankCode: string;
  _id: string;
}
export interface Payload {
  _id: string;
  userId: string;
  bankDetail: BankDetail[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
