import React from "react";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import Head from "next/head";

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Settings</title>
      </Head>
      <DashboardLayout>settings page</DashboardLayout>;
    </>
  );
};

export default SettingsPage;
