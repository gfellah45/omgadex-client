import clsx from "clsx";
import { useTheme } from "next-themes";
import React, { FC } from "react";
import Logo from "../../assets/svg/Logo";

import DashboardNav from "../Header/DashboardNav";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";

const DashboardLayout: FC = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-1 flex-col relative w-full min-h-screen ">
      {/* heading */}
      <div
        className={clsx(
          " w-full flex items-center justify-between bg-offwhite fixed z-50 shadow-md py-3 px-6",
          theme === "light" ? "bg-offwhite" : "bg-neutral-900"
        )}
      >
        <div className="flex items-center">
          <div className="flex space-x-3 items-center ">
            <Logo />
            <div className="text-2xl font-bold">Lajeni</div>
          </div>

          <div className=" pl-20 ml-6 border-l">
            <DashboardNav />
          </div>
        </div>

        {/* user profile */}
        <div>
          <UserProfile />
        </div>
      </div>
      <div className="flex flex-1 flex-wrap pt-12">
        {/* navigation */}
        <div
          className={clsx(
            " w-2/12  shadow-sm fixed z-0 h-screen",
            theme === "light" ? "bg-white" : "bg-neutral-900"
          )}
        >
          <Sidebar />
        </div>
        {/* children */}
        <div
          className={clsx(
            "ml-auto w-10/12  h-auto  pt-6",
            theme === "light" ? "bg-gray-100" : "bg-neutral-900"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
