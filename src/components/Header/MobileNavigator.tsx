import React, { FC } from "react";
import Image from "next/image";

import Link from "next/link";
import { navItems } from "../../data";
import {
  FilledButtons,
  OutlinedButtons,
} from "../../components/shared/Buttons";
import { useRouter } from "next/router";
import Logo from "../../assets/svg/Logo";

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const MobileNavigator: FC<Props> = ({ isOpen, setOpen }) => {
  const { push } = useRouter();
  return (
    <div
      onClick={() => setOpen(!isOpen)}
      className={`fixed top-0 transition-all bg-fixed bg-black bg-opacity-10 ${
        isOpen ? "left-0 right-0 bottom-0" : "-left-3/4"
      } `}
    >
      <div className="w-9/12 h-full bg-white md:w-5/12">
        <div className="flex items-center justify-between p-4">
          <Logo />
          <div className="font-sans text-lg font-semibold text-black">
            Lajeni
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
        <div className="flex flex-col w-full p-4">
          <p className="w-11/12 " onClick={() => push("/signup")}>
            <FilledButtons text={"Sign Up"} />
          </p>
          <p className="w-11/12" onClick={() => push("/login")}>
            <OutlinedButtons text={"Login"} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigator;
