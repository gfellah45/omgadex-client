import baseApi from ".";

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
  }),
});

export const { useGetWalletQuery } = walletApi;
