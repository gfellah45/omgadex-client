import React, { FC } from "react";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import Head from "next/head";

const VouchersPage: FC = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Vouchers</title>
      </Head>
      <DashboardLayout>Vouchers Page</DashboardLayout>;
    </>
  );
};

export default VouchersPage;
