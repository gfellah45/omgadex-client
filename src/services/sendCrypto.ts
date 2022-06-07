import baseApi from ".";

const sendCrypto = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signTransaction: builder.mutation<any, any>({
      query: (params) => ({
        url: "/api/client/crypto/sign",
        method: "POST",
        body: params,
      }),
    }),
    sendTransaction: builder.mutation<any, any>({
      query: (params) => {
        return {
          url: "/api/client/crypto/send",
          method: "POST",
          body: params,
        };
      },
    }),
    recieveTransaction: builder.mutation<any, any>({
      query: (params) => ({
        url: "/api/client/crypto/receive",
        method: "POST",
        body: params,
      }),
    }),
    buyOrSellCrypto: builder.mutation<any, any>({
      query: (params) => ({
        url: "api/client/crypto/sign_trade",
        method: "POST",
        body: params,
      }),
    }),
    completeBuyOrSell: builder.mutation<any, any>({
      query: (params) => ({
        url: "api/client/crypto/trade",
        method: "POST",
        body: params,
      }),
    }),
    convertRateToCrypto: builder.mutation<any, any>({
      query: (params: any) => {
        const { currency, convertedTo, payload } = params;
        return {
          url: `api/client/convert/${currency}/${convertedTo}`,
          method: "POST",
          body: payload,
        };
      },
    }),
    verifyTransaction: builder.mutation<any, any>({
      query: (params) => ({
        url: "/api/client/crypto/verify",
        method: "POST",
        body: params,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignTransactionMutation,
  useSendTransactionMutation,
  useRecieveTransactionMutation,
  useBuyOrSellCryptoMutation,
  useConvertRateToCryptoMutation,
  useVerifyTransactionMutation,
  useCompleteBuyOrSellMutation,
} = sendCrypto;
