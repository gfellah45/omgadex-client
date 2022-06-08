// @ts-nocheck
import React, { FC } from 'react';
import Banner from '../components/Hero/Banner';
import Navigation from '../components/Header/Navigation';
import DoMore from '../components/Services/DoMore';
import GetVoucher from '../components/Voucher/GetVoucher';
import UseVoucher from '../components/Usage/UseVoucher';
import Subscribe from '../components/Subscribe';
import Details from '../components/FAQ/Details';
import Footer from '../components/Footer';

import { useTheme } from 'next-themes';

const Landingpage: FC = () => {
  const { theme } = useTheme();
  return (
    <div className="w-screen">
      <div
        className={`fixed z-50 w-full ${
          theme === 'light' ? 'bg-offwhite' : 'bg-black'
        } `}
      >
        <Navigation />
      </div>
      <div className="z-0 pt-16 lg:pt-28">
        <Banner />
      </div>
      <DoMore />
      <GetVoucher />
      <UseVoucher />
      <Subscribe />
      <Details />
      <Footer />
    </div>
  );
};

export default Landingpage;
