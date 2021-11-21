import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className=" bg-offwhite">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
