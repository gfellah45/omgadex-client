import React, { FC } from "react";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import Head from "next/head";
import Dashboard from "../../src/screens/Dashbaord";
import withAuth from "../../src/utils/withAuth";

const DashboardPage: FC = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Dashboard</title>
      </Head>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </>
  );
};

export default withAuth(DashboardPage);
