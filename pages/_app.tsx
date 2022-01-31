import React from "react";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store } from "../src/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className=" bg-offwhite">
      <Provider store={store}>
        <NextNprogress color="#3772FF" />
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;
