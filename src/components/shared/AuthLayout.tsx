import React, { FC } from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import bgImage from "../../assets/images/auth_right_img.png";

const AuthLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-1 max-h-screen flex-wrap font-poppins">
      <div className="flex-col flex-1 hidden h-screen bg-indigo-100 lg:flex lg:w-1/2">
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

      <div className=" w-full  lg:px-0 lg:w-1/2 items-center h-screen overflow-y-scroll ">
        <div className="mx-auto w-full lg:w-7/12 py-10 px-8 xl:w-1/2 lg:px-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
