import baseApi from ".";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfo, void>({
      query: () => "/api/client/user/me",
      providesTags: ["Dashboard"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserInfoQuery } = dashboardApi;
