import React, { FC } from "react";
import Links from "next/link";
import { useRouter } from "next/router";

import { sideBarItems } from "../../data";

const Sidebar: FC = () => {
  const { pathname } = useRouter();

  const newPath = pathname.slice(0, pathname.lastIndexOf("/"))
    ? pathname.slice(0, pathname.lastIndexOf("/"))
    : pathname;

  return (
    <div className="mt-8">
      <div className="flex justify-center items-center flex-1">
        <ul className=" space-y-4 w-full mx-4 mt-4 ">
          {sideBarItems.map((item, index) => {
            return (
              <li
                className={` cursor-pointer  py-3 px-5 rounded-md text-sm w-full ${
                  newPath === item.href
                    ? "bg-primary   text-white"
                    : "text-omgray3 hover:text-primary"
                } `}
                key={index}
              >
                <Links href={item.href}>
                  <p className="flex items-center space-x-4">
                    {<item.icon />}
                    <a>{item.name}</a>
                  </p>
                </Links>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
