// @ts-nocheck
import React from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoutes from '../src/authRoute/ProtectedRoutes';

import { ThemeProvider } from 'next-themes';
import Protected from '../src/utils/Protected';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextNprogress color="#601ABA" />
          <ThemeProvider enableSystem={false} attribute="class">
            <Protected>
              <Component {...pageProps} />
            </Protected>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
