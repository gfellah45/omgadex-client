import React, { useEffect } from "react";
import Signingpage from "../src/screens/Signingpage";
import Head from "next/head";
import type { NextPage } from "next";
import withAuth from "../src/utils/withAuth";

const login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Omega Dex / Login</title>
      </Head>
      <Signingpage />
    </div>
  );
};

export default withAuth(login);
