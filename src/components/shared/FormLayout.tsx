import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";

interface Props {
  heading?: string;
  sub?: string;
  next?: string;
  link?: string;
  action?: string;
}

const FormLayout: FC<Props> = ({
  children,
  heading,
  sub,
  next,
  link,
  action,
}) => {
  return (
    <div className="pb-2">
      <div className="w-full  lg:hidden">
        <div className="flex items-center justify-center my-3 space-x-2 text-center">
          <Image src={logo} alt="logo" />
          <p className="text-2xl font-bold">Omega Dex</p>
        </div>

        <div className="flex justify-center w-full space-x-1 text-xs font-semibold text-balck lg:flex font-display md:text-sm">
          <p> {next}</p>
          <Link href={`${link}`}>
            <a className="cursor-pointer font-poppins text-primary hover:opacity-75">
              {action}
            </a>
          </Link>
        </div>
      </div>
      <h2 className="mt-2 text-xl font-semibold text-center text-black-800 font-poppins lg:text-center md:text-3xl">
        {heading}
      </h2>
      <div className="mt-4 mb-2 text-xs font-semibold text-center lg:mt-8 font-poppins text-links font-display md:text-sm">
        Please ensure you are on the correct url
      </div>
      <div className="my-4 text-center">
        <div className="w-full p-2 my-2 text-xs tracking-wide text-green-700 rounded-full shadow-sm bg-omgray font-display md:text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-5 h-5"
            viewBox="0 0 20 20"
            fill="green"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          https://
          <span className="text-omgray-700">account.omegadex.com</span>
        </div>
      </div>

      {children}

      <div className="justify-center hidden mt-8 space-x-2 text-xs font-semibold text-center text-omgray-700 lg:flex font-display md:text-sm">
        <p> {next}</p>
        <Link href={`${link}`}>
          <a className="cursor-pointer font-poppins text-primary hover:opacity-75">
            {action}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FormLayout;
