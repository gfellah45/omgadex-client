import React from "react";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store, persistor } from "../src/store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoutes from "../src/authRoute/ProtectedRoutes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className=" bg-offwhite">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextNprogress color="#3772FF" />

          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
