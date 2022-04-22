import React from "react";
import DashboardLayout from "../../../src/components/shared/DashboardLayout";
import Buy from "../../../src/screens/Wallets/Buy";
import Send from "../../../src/screens/Wallets/Send";
import Head from "next/head";
import { useTheme } from "next-themes";

const Index = () => {
  const { theme } = useTheme();
  return (
    <>
      <Head>
        <title> OmegaDEX | Wallets</title>
      </Head>
      <DashboardLayout>
        <Buy />
      </DashboardLayout>
    </>
  );
};

export default Index;
