import baseApi from '.';

type ITransactionResponse = {
  message: string;
  payload: {
    next: { page: number; limit: number };
    results: {
      amount: string;
      coin: string;
      date: string;
      fromAddress: string;
      toAddress: string;
      transactionId: string;
    }[];
    totalPages: number;
    totalRecords: number;
  };
};

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<
      ITransactionResponse,
      { type?: string; page?: number; limit?: number }
    >({
      query: (args) => ({
        url: '/api/client/transactions',
        method: 'GET',
        params: { ...args },
      }),
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionApi;
