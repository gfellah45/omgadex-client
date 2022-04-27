import Head from "next/head";
import React from "react";
import DashboardLayout from "../../../src/components/shared/DashboardLayout";
import Sell from "../../../src/screens/Wallets/Sell";
import Send from "../../../src/screens/Wallets/Send";

const index = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Wallets</title>
      </Head>
      <DashboardLayout>
        <Sell />
      </DashboardLayout>
    </>
  );
};

export default index;
