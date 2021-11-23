import React from "react";
import Signingpage from "../src/screens/Signingpage";
import Head from "next/head";

interface Props {}

const login = (props: Props) => {
  return (
    <div>
      <Head>
        <title>Omega Dex / Login</title>
      </Head>
      <Signingpage />
    </div>
  );
};

export default login;
