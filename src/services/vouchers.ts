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

    getRecentRate: builder.query<IInternalRates, void>({
      query: () => "/api/admin/internal/rates",
    }),

    redeemVoucher: builder.mutation<any, string>({
      query: (voucher) => ({
        url: "api/client/voucher/redeem",
        method: "POST",
        body: { voucherCode: voucher },
      }),
      invalidatesTags: ["RedeemVoucher"],
    }),

    // purchase voucher for non logged in user

    purchaseVoucherNonLoggedIn: builder.mutation<any, Partial<ICreateVoucher>>({
      query: (voucher) => ({
        url: "/api/client/voucher/purchase/new",
        method: "POST",
        body: voucher,
      }),
    }),
  }),
});

export const {
  usePurchaseVoucherMutation,
  useVerifyPaymentQuery,
  useGetRecentRateQuery,
  useRedeemVoucherMutation,
  usePurchaseVoucherNonLoggedInMutation,
} = vouchersApi;
