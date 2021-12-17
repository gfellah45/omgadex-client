import React, { FC } from "react";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import Head from "next/head";

const TransactionsPage: FC = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Transactions</title>
      </Head>
      <DashboardLayout>Trasactions pagee</DashboardLayout>;
    </>
  );
};

export default TransactionsPage;
