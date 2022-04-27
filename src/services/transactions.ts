import baseApi from ".";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<any, { type?: string }>({
      query: ({ type }) => `api/client/transactions/${type}/1/10`,
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionApi;
