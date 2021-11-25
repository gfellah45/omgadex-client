import React from "react";
import Image from "next/image";
import logo from "../assets/images/logo.svg";
import bgImage from "../assets/images/auth_right_img.png";

interface Props {}

const Signingpage = (props: Props): JSX.Element => {
  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-lg">
        <div className="flex justify-center py-12 bg-indigo-100 lg:bg-indigo lg:justify-start lg:px-12">
          <div className="flex items-center cursor-pointer">
            <div>
              <Image src={logo} width="50" height="50" />
            </div>
            <div className="ml-2 text-2xl font-bold tracking-wide text-black-800">
              Omega Dex
            </div>
          </div>
        </div>
        <div className="items-center justify-center flex-1 hidden h-screen bg-indigo-100 lg:flex">
          <Image src={bgImage} />
        </div>
      </div>
      <div className="px-12 mt-10 sm:px-24 md:px-48 lg:px-12 lg:mt-36 xl:px-24 xl:max-w-2xl">
        <h2 className="text-xl font-semibold text-center text-black-800 font-display lg:text-left md:text-3xl">
          Sign in to Omega Dex
        </h2>
        <div className="mt-12 text-xs font-semibold text-center text-gray-300 font-display md:text-sm">
          Please ensure you are on the correct url
        </div>
        <div className="mt-2 text-center">
          <div className="w-full p-1 text-xs tracking-wide text-green-700 bg-gray-100 rounded-full shadow-sm font-display md:text-sm">
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
            https://<span className="text-gray-700">account.omegadex.com</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="p-1 px-4 py-2 font-semibold tracking-wide rounded-full shadow-sm bg-black-800 text-white-100 w-xl font-display">
            Email
          </button>
          <button className="p-1 px-4 py-2 font-semibold tracking-wide text-gray-100 bg-gray-200 rounded-full shadow-sm w-xl font-display">
            Mobile
          </button>
        </div>
        <div className="grid grid-cols-1 mt-4 divide-y divide-gray-300">
          <div> </div>
          <div> </div>
        </div>
        <div className="mt-12">
          <form>
            <div className="mt-8">
              <div className="text-sm font-bold tracking-wide text-gray-600">
                Email{" "}
              </div>
              <input
                className="w-full px-2 py-2 text-lg border border-b border-gray-100 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Email Address"
              />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold tracking-wide text-gray-600">
                  Password
                </div>
                <div>
                  <a className="text-xs font-semibold text-indigo-600 cursor-pointer font-display hover:text-indigo-800"></a>
                </div>
              </div>
              <input
                className="w-full px-2 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Password"
              />
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold tracking-wide text-gray-700"></div>
                <div>
                  <a className="text-xs font-semibold text-indigo-600 cursor-pointer font-display hover:text-indigo-800">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button className="w-full p-4 font-semibold tracking-wide text-gray-100 bg-blue-500 rounded-lg shadow-lg font-display focus:outline-none focus:shadow-outline hover:bg-blue-600">
                Log In
              </button>
            </div>
          </form>
          <div className="mt-12 text-xs font-semibold text-center text-gray-700 font-display md:text-sm">
            Don't have an account ?{" "}
            <a className="text-indigo-600 cursor-pointer hover:text-indigo-800">
              Sign up for free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signingpage;
