import React, { FC } from "react";
import Head from "next/head";

import VerifyAccount from "../src/screens/VerifyAccount";

const verify: FC = () => {
  return (
    <div>
      <Head>
        <title>Omega Dex / Signup</title>
      </Head>
      <VerifyAccount />
    </div>
  );
};

export default verify;
