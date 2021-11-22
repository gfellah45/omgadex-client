import React from "react";
import Image from "next/image";
import logo from "src/assets/images/icon.png";
import bgImage from "src/assets/images/auth_right_img.png";

interface Props {}

const Signingpage = (props: Props): JSX.Element => {
  return (
    <div className="lg:flex">
            <div className="lg:w-1/2 xl:max-w-screen-lg">
                <div className="py-12 bg-indigo-100 lg:bg-indigo flex justify-center lg:justify-start lg:px-12">
                    <div className="cursor-pointer flex items-center">
                        <div>
                            <Image src={logo} width="50" height="50" />
                        </div>
                        <div className="text-2xl text-black-800 tracking-wide ml-2 font-bold">Omega Dex</div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
              
                    <Image src={bgImage} />
             
            </div>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-36 xl:px-24 xl:max-w-2xl">
                    <h2 className="text-center text-black-800 font-display font-semibold lg:text-left  text-xl md:text-3xl">Sign in to Omega Dex</h2>
					<div className="mt-12 font-display font-semibold text-gray-300 text-center text-xs md:text-sm">Please ensure you are on the correct url</div>
					<div className="mt-2  text-center">
					
								<div className="bg-gray-100 text-green-700 p-1 w-full rounded-full tracking-wide font-display font-display shadow-sm text-xs md:text-sm">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="green">
  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
</svg>https://<span className="text-gray-700">account.omegadex.com</span>
								</div>
                    </div>
					<div className="mt-6 text-center">
                    <button className="bg-black-800 text-white-100 p-1 w-xl py-2 px-4 rounded-full tracking-wide font-display font-semibold shadow-sm">
                                    Email
                                </button>
								<button className="bg-gray-200 text-gray-100 p-1 w-xl py-2 px-4 rounded-full tracking-wide font-display font-semibold shadow-sm">
                                    Mobile
                                </button>
					</div>
					<div className="mt-4 grid grid-cols-1 divide-y divide-gray-300">
					  <div> </div>
					  <div> </div>
					</div>
                    <div className="mt-12">
                        <form>
                            <div className="mt-8">
                                <div className="text-sm font-bold text-gray-600 tracking-wide">Email </div>
                                <input className="w-full text-lg py-2 px-2 border rounded-md border-b border-gray-100 focus:outline-none focus:border-indigo-500" type="text" placeholder="Email Address" /> 
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-600 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer">
                                        </a>
                                    </div>
                                </div>
                                <input className="w-full text-lg py-2 px-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Password" /> 
								<div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        
                                    </div>
                                    <div>
                                        <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <button className="bg-blue-500 text-gray-100 p-4 w-full rounded-lg tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600
                                shadow-lg">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 font-display font-semibold text-gray-700 text-center text-xs md:text-sm">
                            Don't have an account ? <a className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up for free</a>
                        </div>
                    </div>
                </div>
        </div>
  );
};

export default Signingpage;