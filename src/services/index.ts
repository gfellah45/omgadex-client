import { RootState } from "./../store/index";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { logout, registerToken } from "../reducers/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as RootState;
    if (auth.token) {
      headers.set("Authorization", `Bearer ${auth.token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    // try to get a new token
    const refreshResult = await baseQuery("/client/refresh", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(registerToken({ loginToken: refreshResult.data as string }));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  //  cache , The default time is seconds , Default duration 60 second
  tagTypes: ["RedeemVoucher", "PurchaseVoucher", "Dashboard"],
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
});

export default baseApi;
