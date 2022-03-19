import React, { FC, useState } from "react";
import Container from "../../../src/components/shared/Container";

import Hambuger from "./Hambuger";
import { Tween } from "react-gsap";
import MobileNavigator from "./MobileNavigator";
import Desktopnav from "./Desktopnav";
import { FilledButtons, OutlinedButtons } from "../shared/Buttons";
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from "next/router";
import Logo from "../../assets/svg/Logo";
import Switcher from "../shared/Switcher";

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  return (
    <Tween
      from={{ delay: 0.1, height: "0%", opacity: 0 }}
      stagger={0.2}
      ease="elastic.out(0.1, 0.1)"
    >
      <div className="w-full shadow-md  ">
        <Container>
          <div className="flex flex-wrap items-center justify-between flex-1 p-2 md:py-2 lg:py-2">
            {/* logo and company name */}

            <div className="flex items-center lg:w-[60%]  xl:w-[70%] ">
              <div className="flex items-center lg:border-r border-r-links lg:w-[20%] xl:lg:w-[20%]">
                <Logo />
                <div className="mx-2 text-lg font-bold  md:text-lg lg:text-2xl font-poppins">
                  Lajeni
                </div>
              </div>

              <div className="hidden lg:ml-5 xl:ml-10 lg:block">
                <Desktopnav />
              </div>
            </div>
            {/* <Switcher /> */}
            {/* desktop navigation */}

            {/* loging and language buttons */}
            <div className="items-center justify-between hidden lg:w-[27%] xl:w-[30%] lg:flex">
              <Switcher />
              <button className="flex items-center space-x-2">
                <span className="text-sm lg:text-sm">{"EN"}</span>{" "}
                <FaCaretDown />
              </button>
              <div className="flex lg:space-x-3 ">
                <p onClick={() => router.push("/signup")}>
                  <FilledButtons text="Sign Up" />
                </p>
                <p onClick={() => router.push("/login")}>
                  <OutlinedButtons text="Login" />
                </p>
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
    </Tween>
  );
};

export default Navigation;
