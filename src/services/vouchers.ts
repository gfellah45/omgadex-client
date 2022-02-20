import baseApi from ".";

const vouchersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    purchaseVoucher: builder.mutation<IVoucherResponse, ICreateVoucher>({
      query: (voucher) => ({
        url: "/api/client/voucher/purchase",
        method: "POST",
        body: voucher,
      }),
    }),
    verifyPayment: builder.query<void, string | null>({
      query: (reference) => ({
        url: "/api/client/paystack/callback",
        method: "GET",
        params: { reference },
      }),
    }),
  }),
});

export const { usePurchaseVoucherMutation, useVerifyPaymentQuery } =
  vouchersApi;
