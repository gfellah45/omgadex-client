import React from "react";
import DashboardLayout from "../../src/components/shared/DashboardLayout";
import Head from "next/head";
import SettingScreen from "../../src/screens/Settings";

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title> OmegaDEX | Settings</title>
      </Head>
      <DashboardLayout>
        <SettingScreen />
      </DashboardLayout>
      ;
    </>
  );
};

export default SettingsPage;
