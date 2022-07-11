import baseApi from '.';
import { Inputs } from '../screens/Settings/Profile/ProfileTab';

type IBankDetails = {
  message: string;
  payload: {
    bank_name: string;
    account_name: string;
    account_number: string;
    bank_code: string;
  };
};

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<any, any>({
      query: () => ({
        url: '/api/client/profile',
        method: 'GET',
        refetchOnMountOrArgChange: true,
      }),
    }),
    updateUserProfile: builder.mutation<Inputs, any>({
      query: (userData) => ({
        url: '/api/client/edit',
        method: 'PATCH',
        body: userData,
      }),
    }),
    changePassword: builder.mutation<Inputs, any>({
      query: (params) => ({
        url: '/settings/edit',
        method: 'PUT',
        body: params,
      }),
    }),
    addAccountDetail: builder.mutation<any, any>({
      query: (accountDetails) => ({
        url: '/settings/add/bank-details',
        method: 'POST',
        body: accountDetails,
      }),
      invalidatesTags: ['BankDetails'],
    }),
    fetchAccountDetails: builder.mutation<IBankDetails, { accountNo: string }>({
      query: (accountNo) => ({
        url: '/settings/get/account/details',
        method: 'POST',
        body: accountNo,
      }),
    }),
    getAllBankDetails: builder.query({
      query: () => ({
        url: '/settings/get/all/bank-details',
        method: 'GET',
      }),
      providesTags: ['BankDetails'],
    }),
    DeleteABankDetail: builder.mutation({
      query: (accountNumber) => ({
        url: '/settings/delete/bank-details',
        method: 'DELETE',
        body: accountNumber,
      }),
      invalidatesTags: ['BankDetails'],
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
} = settingsApi;
