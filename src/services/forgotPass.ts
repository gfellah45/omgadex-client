import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forgetPassApi = createApi({
  reducerPath: "forgetPassApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      let token = localStorage.getItem("tempToken");
      if (token) {
        headers.set("token", `Bearer ${JSON.parse(token)}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<UserResponse, UserLogin>({
      query: (user) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: user,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = forgetPassApi;
