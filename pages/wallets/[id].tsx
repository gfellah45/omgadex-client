import React from "react";
import Head from "next/head";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import TransactionTrade from "../../src/screens/Wallets/TransactionTrade";

const SingleTransaction = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Single Transaction</title>
      </Head>
      <DashboardLayout>
        <TransactionTrade />
      </DashboardLayout>
    </>
  );
};

export default SingleTransaction;
