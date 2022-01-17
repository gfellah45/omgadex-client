import React, { FC } from "react";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import Head from "next/head";
import VouchersScreen from "../../src/screens/VouchersScreen";

const VouchersPage: FC = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Vouchers</title>
      </Head>
      <DashboardLayout>
        <VouchersScreen />
      </DashboardLayout>
      ;
    </>
  );
};

export default VouchersPage;
