import React, { FC } from "react";
import Signuppage from "../src/screens/Signuppage";
import Head from "next/head";

const signup: FC = () => {
  return (
    <div>
      <Head>
        <title>Omega Dex / Signup</title>
      </Head>
      <Signuppage />
    </div>
  );
};

export default signup;
