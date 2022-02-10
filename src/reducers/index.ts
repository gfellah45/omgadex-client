import { combineReducers } from "@reduxjs/toolkit";
import ui from "./ui";
import auth from "./auth";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import baseApi from "../services";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  transforms: [
    encryptTransform({
      secretKey: "teejay2022",
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
  storage: storageSession,
  key: "omega",
  whitelist: ["auth"],
};

const rootStore = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth,
  ui,
});

const rootReducer = persistReducer(persistConfig, rootStore);

export default rootReducer;
