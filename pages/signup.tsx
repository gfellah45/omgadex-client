import React from "react";
import Signuppage from "../src/screens/Signuppage";
import Head from "next/head";

interface Props {}

const signup = (props: Props) => {
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
