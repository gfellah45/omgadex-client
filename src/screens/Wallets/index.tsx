import React from "react";
import CarretDown from "../../assets/svg/CarretDown";
import Eye from "../../assets/svg/Eye";

const Wallets = () => {
  return (
    <div className="flex flex-1 flex-col px-8">
      <div>
        <div className="flex  flex-wrap bg-white py-12 px-10 rounded-lg shadow-sm">
          <div className="w-6/12 space-y-7">
            <p className="text-3xl font-bold">Wallet Overview</p>
            <div>
              <p className="text-lg text-neutral-500">Total Balance</p>
              <p className="text-4xl font-bold"> N 123,456,789</p>
            </div>
            <div>
              <p className=" text-gray-500 ">
                0.123456777
                <span className="bg-green-500 mx-3 text-white p-2 rounded-lg">
                  BTC
                </span>
              </p>
            </div>
          </div>
          <div className="w-6/12 flex flex-col justify-between">
            <div className="flex space-x-2 justify-end ml-auto ">
              <p className="px-2 py-2 flex cursor-pointer rounded-lg space-x-3 border-2 text-neutral-500">
                <span>Show Balance</span> <Eye />
              </p>
              <p className="bg-gray-300 cursor-pointer space-x-2 flex items-center px-4 py-1 rounded-2xl text-neutral-800">
                <span>NGN</span> <CarretDown />
              </p>
            </div>
            <div>buttons</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
