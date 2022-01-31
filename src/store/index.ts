import { forgetPassApi } from "./../services/forgotPass";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import uiSlice from "../reducers/ui";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [forgetPassApi.reducerPath]: forgetPassApi.reducer,
    ui: uiSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
