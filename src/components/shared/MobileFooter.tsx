import React, { FC } from "react";
import Links from "next/link";
import { useRouter } from "next/router";

import { sideBarItems } from "../../data";

const MobileFooter: FC = () => {
  const { asPath } = useRouter();

  const currentPath = asPath.split("/")[1];

  return (
    <footer className="flex items-center justify-around fixed bottom-0 md:hidden w-full h-[90px] bg-white mt-5">
      {sideBarItems.map((nav, index) => {
        return (
          <Links href={nav.href} key={index}>
            <span
              className={`h-4/10 p-3
                ${
                  `/${currentPath}` === nav.href
                    ? "bg-primary   text-white"
                    : "text-omgray3 hover:text-white cursor-pointer hover:bg-primary"
                }
                    grid place-items-center rounded`}
            >
              {<nav.icon />}
            </span>
          </Links>
        );
      })}
    </footer>
  );
};

export default MobileFooter;
