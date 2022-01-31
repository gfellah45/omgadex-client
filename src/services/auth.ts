import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation<UserResponse, UserLogin>({
      query: (user) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: user,
      }),
    }),

    createUser: builder.mutation<UserResponse, CreateUser>({
      query: (user) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: user,
      }),
    }),

    verificationRequest: builder.mutation<UserResponse, UserLogin>({
      query: ({ email }) => ({
        url: "/auth/resend-code",
        method: "POST",
        body: { email: email },
      }),
    }),

    verifyUser: builder.mutation<UserResponse, VerifyUser>({
      query: ({ email, code }) => ({
        url: "/auth/verify-user",
        method: "POST",
        body: { email: email, code: code },
      }),
    }),

    forgotPassword: builder.mutation<UserResponse, UserLogin>({
      query: ({ email }) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body: { email: email },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUserLoginMutation,
  useVerificationRequestMutation,
  useVerifyUserMutation,
  useCreateUserMutation,
  useForgotPasswordMutation,
} = authApi;
