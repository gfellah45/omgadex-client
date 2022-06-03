import baseApi from ".";
import { Inputs } from "../screens/Settings/Profile/ProfileTab";

const sendCrypto = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<any, any>({
      query: () => ({
        url: "/api/client/profile",
        method: "GET",
        refetchOnMountOrArgChange: true,
      }),
    }),
    updateUserProfile: builder.mutation<Inputs, any>({
      query: (userData) => ({
        url: "/api/client/edit",
        method: "PATCH",
        body: userData,
      }),
    }),
    changePassword: builder.mutation<Inputs, any>({
      query: (params) => ({
        url: "/settings/edit",
        method: "PUT",
        body: params,
      }),
    }),
    addAccountDetail: builder.mutation<any, any>({
      query: (accountDetails) => ({
        url: "/settings/add/bank-details",
        method: "POST",
        body: accountDetails,
      }),
    }),
    fetchAccountDetails: builder.mutation<{ accountNo: string }, any>({
      query: (accountNo) => ({
        url: "/settings/get/account/details",
        method: "POST",
        body: accountNo,
      }),
    }),
    getAllBankDetails: builder.query({
      query: () => ({
        url: "/settings/get/all/bank-details",
        method: "GET",
      }),
    }),
    DeleteABankDetail: builder.mutation({
      query: (accountNumber) => ({
        url: "/settings/delete/bank-details",
        method: "DELETE",
        body: accountNumber,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
  useFetchAccountDetailsMutation,
  useGetAllBankDetailsQuery,
  useDeleteABankDetailMutation,
  useAddAccountDetailMutation,
} = sendCrypto;
