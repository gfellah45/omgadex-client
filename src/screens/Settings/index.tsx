import React, { FC, useState } from "react";
import Image from "next/image";
import ProfileTab from "./Profile/ProfileTab";
import Security from "./Security/Security";
import BankDetails from "./BankDetails/BankDetails";

interface settingsScreenData {
  title: string;
  tab: boolean;
  component?: JSX.Element | (() => JSX.Element);
}

let settingsScreenData: settingsScreenData[] = [
  {
    title: "Profile",
    tab: true,
    component: <ProfileTab />,
  },
  {
    title: "Security",
    tab: true,
    component: <Security />,
  },
  { title: "Bank Details", tab: true, component: <BankDetails /> },
];

function SettingScreen() {
  const [activeTab, setActiveTab] = useState<settingsScreenData>(settingsScreenData[0]);

  return (
    <div className="flex flex-col flex-1 px-6">
      {/* heading */}
      <div className="px-5 py-4 text-4xl font-bold bg-white rounded-2xl">Settings</div>
      {/* Settings content */}
      <section className="flex flex-col flex-1 h-full px-5 mt-3 bg-white shadow-sm rounded-2xl ">
        <div className="flex flex-wrap items-center justify-between w-full py-6 mb-3 border-b ">
          <div className="md:w-6/12">
            <ul className="flex  items-center gap-3">
              {settingsScreenData.map((data, index) => {
                return (
                  <li
                    key={index}
                    className={` rounded-2xl ${
                      data.title === activeTab.title
                        ? "bg-neutral-600 text-white"
                        : "text-neutral-500 "
                    } hover:bg-neutral-600 hover:text-white cursor-pointer 
                 py-1 px-3 text-sm font-bold `}
                    onClick={() => data.tab && setActiveTab(settingsScreenData[index])}
                  >
                    {data.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="min-h-[60vh]">
          <div>{activeTab.component}</div>;
        </div>
      </section>
    </div>
  );
}

export default SettingScreen;
