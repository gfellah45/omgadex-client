import React, { FC } from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import bgImage from "../../assets/images/auth_right_img.png";

interface Props {}

const AuthLayout: FC = ({ children }) => {
  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-lg">
        <div className="flex justify-center py-12 bg-indigo-100 lg:bg-indigo lg:justify-start lg:px-12">
          <div className="flex items-center cursor-pointer">
            <div>
              <Image src={logo} width="50" height="50" />
            </div>
            <div className="ml-2 text-2xl font-bold tracking-wide text-black-800">
              Omega Dex
            </div>
          </div>
        </div>
        <div className="items-center justify-center flex-1 hidden h-screen bg-indigo-100 lg:flex">
          <Image src={bgImage} />
        </div>
      </div>
      <div className="px-12 mt-10 sm:px-24 md:px-48 lg:px-12 lg:mt-36 xl:px-24 xl:max-w-2xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
