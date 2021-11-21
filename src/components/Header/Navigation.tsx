import React, { FC, useState } from "react";
import Container from "../../../src/components/shared/Container";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import Hambuger from "./Hambuger";

import MobileNavigator from "./MobileNavigator";
import Desktopnav from "./Desktopnav";
import { FilledButtons, OutlinedButtons } from "../shared/Buttons";
import { FaCaretDown } from "react-icons/fa";

interface Props {}

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full shadow-md ">
      <Container>
        <div className="flex flex-wrap items-center justify-between p-2 md:py-2 lg:py-2">
          {/* logo and company name */}
          <div className="flex items-center lg:w-3/12">
            <Image src={logo} alt="logo" />
            <div className="mx-2 text-lg font-bold text-black md:text-lg lg:text-2xl font-poppins">
              Omega Dex
            </div>
          </div>

          {/* desktop navigation */}
          <div className="hidden w-3/6 lg:block">
            <Desktopnav />
          </div>

          {/* loging and language buttons */}
          <div className="items-center justify-between hidden lg:w-3/12 xl:w-1/6 lg:flex">
            <button className="flex items-center space-x-1">
              <span className="text-sm lg:text-sm">{"EN"}</span> <FaCaretDown />
            </button>
            <div className="flex lg:space-x-2 ">
              <FilledButtons text="Sign Up" />
              <OutlinedButtons text="Login" />
            </div>
          </div>

          {/* mobile nav */}
          <div className="block lg:hidden">
            <Hambuger open={isOpen} setOpen={setIsOpen} />
          </div>
        </div>
        <MobileNavigator isOpen={isOpen} setOpen={setIsOpen} />
      </Container>
    </div>
  );
};

export default Navigation;
