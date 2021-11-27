import React, { FC } from "react";
import Head from "next/head";
import VerifyCode from "../src/screens/VerifyCode";

const verifycode: FC = () => {
  return (
    <div>
      <Head>
        <title>Omega Dex / Signup</title>
      </Head>
      <VerifyCode />
    </div>
  );
};

export default verifycode;
