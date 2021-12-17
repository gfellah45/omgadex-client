import React, { FC } from "react";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import Head from "next/head";
import Wallets from "../../src/screens/Wallets";

const WalletsPage: FC = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Wallets</title>
      </Head>
      <DashboardLayout>
        <Wallets />
      </DashboardLayout>
      ;
    </>
  );
};

export default WalletsPage;
