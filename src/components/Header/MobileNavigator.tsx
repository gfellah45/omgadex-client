import React, { FC } from "react";
import Image from "next/image";
import logo from "src/assets/images/logo.svg";
import Link from "next/link";
import { navItems } from "src/data/index";
import { FilledButtons, OutlinedButtons } from "src/components/shared/Buttons";

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const MobileNavigator: FC<Props> = ({ isOpen, setOpen }) => {
  return (
    <div
      onClick={() => setOpen(!isOpen)}
      className={`fixed top-0 transition-all bg-fixed bg-black bg-opacity-10 ${
        isOpen ? "left-0 right-0 bottom-0" : "-left-3/4"
      } `}
    >
      <div className="w-9/12 h-full bg-white md:2/12">
        <div className="flex items-center justify-between p-4">
          <Image src={logo} />
          <div className="font-sans text-lg font-semibold text-black">
            Omega Dex
          </div>
        </div>
        <div className="p-4 ">
          {navItems.map((item, idx) => {
            return (
              <nav key={idx}>
                <ul className="flex flex-col justify-between ">
                  <li className="my-3 cursor-pointer text-links hover:opacity-75 hover:text-primary hover:transition-all">
                    <Link href={item.link}>
                      <a>{item.name}</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            );
          })}
        </div>
        <div className="flex flex-col p-4">
          <FilledButtons text={"Sign Up"} />
          <OutlinedButtons text={"Login"} />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigator;
