import React, { FC } from "react";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import Head from "next/head";
import Trx from "../../src/screens/Trx";

const TransactionsPage: FC = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Transactions</title>
      </Head>
      <DashboardLayout>
        <Trx />
      </DashboardLayout>
      ;
    </>
  );
};

export default TransactionsPage;
