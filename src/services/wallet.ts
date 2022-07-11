import baseApi from '.';

interface IwalletReq {
  address: string;
  symbol: string;
}

const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<any, IwalletReq>({
      query: ({ address, symbol }) =>
        `/api/client/crypto_balance/${address}/${symbol}`,
    }),

    // getting fiat wallet balance
    getFiatWallet: builder.query<any, void>({
      query: () => '/api/client/fiat_balance',
      providesTags: ['RedeemVoucher'],
    }),

    // transfer to dollar wallet
    transferToDollarWallet: builder.mutation<
      any,
      { amount: number; type: string }
    >({
      query: ({ amount, type }) => ({
        url: '/api/client/transfer',
        method: 'POST',
        body: {
          amount,
          destinationWallet: type,
        },
      }),
      invalidatesTags: ['RedeemVoucher'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetWalletQuery,
  useGetFiatWalletQuery,
  useTransferToDollarWalletMutation,
} = walletApi;
