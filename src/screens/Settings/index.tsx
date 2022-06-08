import React, { FC, useState } from "react";
import ProfileTab from "./Profile/ProfileTab";
import Security from "./Security/Security";
import BankDetails from "./BankDetails/BankDetails";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useGetAllBankDetailsQuery, useGetUserProfileQuery } from "../../services/settings";

interface settingsScreenData {
  title: string;
  tab: boolean;
}

let settingsScreenData: settingsScreenData[] = [
  {
    title: "Profile",
    tab: true,
  },
  {
    title: "Security",
    tab: true,
  },
  { title: "Bank Details", tab: true },
];

function SettingScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading } = useGetUserProfileQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const { data: allBankDetials, isLoading: bankDetailsLoading } = useGetAllBankDetailsQuery("", {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const { theme } = useTheme();

  console.log(bankDetailsLoading, "status of the profile page");

  // useEffect(() => {}, [])

  const renderedTab = function (tab: number) {
    switch (tab) {
      case 0:
        return <ProfileTab payload={data.payload} />;
      case 1:
        return <Security />;
      case 2:
        return <BankDetails data={allBankDetials} />;
      default:
        return <ProfileTab payload={data.payload} />;
    }
  };
  return (
    <div className="flex flex-col flex-1 px-6">
      {/* heading */}
      <div
        className={clsx(
          "px-5 py-4 text-4xl font-bold  rounded-2xl",
          theme === "light" ? "bg-white" : "bg-neutral-800"
        )}
      >
        Settings
      </div>
      {/* Settings content */}
      <section
        className={clsx(
          "flex flex-col flex-1 h-full px-5 mt-3 bg-white shadow-sm rounded-2xl",
          theme === "light" ? "bg-white" : "bg-neutral-800"
        )}
      >
        <div className="flex flex-wrap items-center justify-between w-full py-6 mb-3 border-b ">
          <div className="md:w-6/12">
            <ul className="flex  items-center gap-3">
              {settingsScreenData.map((data, index) => {
                return (
                  <li
                    key={index}
                    className={` rounded-2xl ${
                      data.title === settingsScreenData[activeTab].title
                        ? "bg-neutral-600 text-white"
                        : "text-neutral-500 "
                    } hover:bg-neutral-600 hover:text-white cursor-pointer 
                 py-1 px-3 text-sm font-bold `}
                    onClick={() => setActiveTab(index)}
                  >
                    {data.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="min-h-[60vh]">
          <div>
            {/* {settingsScreenData[activeTab].component} */}
            {renderedTab(activeTab)}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SettingScreen;
