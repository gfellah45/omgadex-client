import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import Navigation from "../src/components/Header/Navigation";
import astronaut from "../public/assets/astronaut.png";
import mobileAstronaut from "../public/assets/mobileAstronaut.png";
import spaceShip from "../public/assets/spaceShip.png";

const PageNotFound = () => {
  const { push } = useRouter();
  const { theme } = useTheme();
  return (
    <div className="w-screen font-poppins">
      <div
        className={`z-50 w-full  font-sans ${
          theme === "light" ? "bg-offwhite border-b" : "bg-black"
        } `}
      >
        <Navigation />
      </div>
      <main className="font-poppins pt-10 ">
        <div className="md:flex hidden justify-center items-center w-full h-[18vh]">
          <Image alt="space ship" src={spaceShip} className="" />
        </div>
        <section className="md:h-[68vh]  p-7 md:p-0 flex  md:flex-row flex-col-reverse">
          <div className="h-full w-full  md:w-5/12 md:p-20 md:pl-24">
            <p className="md:text-xl  font-normal capitalize text-light_blue">404 Error</p>
            <h1 className="text-5xl md:text-7xl font-poppins font-bold py-2">Ohh my... </h1>
            <p
              className={` ${theme === "light" ? "text-neutral-400" : "white"} text-md md:text-xl`}
            >
              It looks like this page has been lost in space
            </p>
            <button
              onClick={() => push("/")}
              className="text-sm font-bold py-3 px-5 md:px-3 md:w-4/12 my-3 text-white bg-primary rounded-md"
            >
              Back to Home
            </button>
          </div>
          <div className="h-full w-full md:w-7/12 md:bg-astronautBg bg-bottom bg-no-repeat  flex items-start justify-start">
            <div className="hidden md:block">
              <Image alt="astonaut background" src={astronaut} className="" />
            </div>
            <div className="md:hidden">
              <Image alt="astonaut background" src={mobileAstronaut} className="" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PageNotFound;
