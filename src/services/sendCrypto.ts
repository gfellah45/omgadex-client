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
  }),
  overrideExisting: true,
});

export const {
  useSignTransactionMutation,
  useSendTransactionMutation,
  useRecieveTransactionMutation,
} = sendCrypto;
