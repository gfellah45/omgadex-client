import React, { FC } from "react";
import Image from "next/image";
import bgImage from "../../assets/images/auth_bg.svg";
import Logo from "../../assets/svg/Logo";
import { useTheme } from "next-themes";
import clsx from "clsx";

const AuthLayout: FC = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-1 max-h-screen flex-wrap font-poppins">
      <div
        className={clsx(
          "flex-col flex-1 hidden h-screen  lg:flex lg:w-1/2",
          theme === "light" ? "bg-auth_bg" : " bg-neutral-900 "
        )}
      >
        <div className="flex justify-center py-12 lg:justify-start lg:px-12">
          <div className="flex items-center cursor-pointer">
            <div>
              <Logo />
            </div>
            <div className="ml-2 text-2xl font-bold tracking-wide text-black-800">
              Lajeni
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "items-center justify-center flex-1 hidden  lg:flex",
            theme === "light" ? "bg-auth_bg" : " bg-neutral-900 "
          )}
        >
          <Image src={bgImage} alt="logo" />
        </div>
      </div>

      <div className=" w-full  lg:px-0 lg:w-1/2 items-center h-screen overflow-y-scroll ">
        <div className="mx-auto w-full lg:w-7/12 py-10 px-8 xl:w-7/12 lg:px-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
