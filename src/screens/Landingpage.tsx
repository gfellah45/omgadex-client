import React from "react";
import Banner from "../components/Hero/Banner";
import Navigation from "../components/Header/Navigation";
import DoMore from "../components/Services/DoMore";
import GetVoucher from "../components/Voucher/GetVoucher";
import UseVoucher from "../components/Usage/UseVoucher";
import Subscribe from "../components/Subscribe";

interface Props {}

const Landingpage = (props: Props): JSX.Element => {
  return (
    <div className="w-screen">
      <div className="fixed z-50 w-full bg-offwhite">
        <Navigation />
      </div>
      <div className="z-0 pt-16 lg:pt-28">
        <Banner />
      </div>
      <DoMore />
      <GetVoucher />
      <UseVoucher />
      <Subscribe />
    </div>
  );
};

export default Landingpage;
