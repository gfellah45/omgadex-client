import React, { FC } from "react";
import Logo from "../../assets/svg/Logo";

import DashboardNav from "../Header/DashboardNav";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";

const DashboardLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col relative w-full min-h-screen ">
      {/* heading */}
      <div className=" w-full flex items-center justify-between bg-offwhite fixed z-50 shadow-md py-2 px-6">
        <div className="flex items-center">
          <div className="flex space-x-3 items-center ">
            <Logo />
            <h1 className="text-2xl font-bold">Omega Dex</h1>
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
        <div className=" w-2/12 bg-white shadow-sm fixed z-0 h-screen">
          <Sidebar />
        </div>
        {/* children */}
        <div className="ml-auto w-10/12  h-auto bg-gray-100 pt-6 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
