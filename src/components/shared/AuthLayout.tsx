import React, { FC } from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import bgImage from "../../assets/images/auth_right_img.png";

interface Props {}

const AuthLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-wrap flex-1 h-screen font-poppins">
      <div className="flex-col flex-1 hidden h-auto bg-indigo-100 lg:flex lg:w-1/2">
        <div className="flex justify-center py-12 lg:justify-start lg:px-12">
          <div className="flex items-center cursor-pointer">
            <div>
              <Image src={logo} alt="logo" />
            </div>
            <div className="ml-2 text-2xl font-bold tracking-wide text-black-800">
              Omega Dex
            </div>
          </div>
        </div>
        <div className="items-center justify-center flex-1 hidden bg-indigo-100 lg:flex">
          <Image src={bgImage} alt="logo" />
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 overflow-y-scroll">
        <div className="w-full px-8 lg:w-9/12 xl:w-1/2 lg:px-0 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
