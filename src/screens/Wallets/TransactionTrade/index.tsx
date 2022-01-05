import React from "react";
import ArrowBack from "../../../assets/svg/ArrowBack";
import Deposit from "../../../assets/svg/Deposit";
import FiatNaira from "../../../assets/svg/FiatNaira";
import Send from "../../../assets/svg/Send";
import { TransactionButtons } from "../../../components/shared/Buttons";
import { useRouter } from "next/router";

import TransactionTable from "../../../components/shared/TransactionTable";

const TransactionTrade = () => {
  const { back } = useRouter();

  return (
    <div className="flex flex-1 flex-col h-full px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="flex justify-between flex-wrap items-center px-6 py-4">
          <div className="flex space-x-2 items-center w-5/12">
            <p className="cursor-pointer" onClick={() => back()}>
              <ArrowBack />
            </p>
            <p>
              <FiatNaira />
            </p>
            <p className="text-4xl font-bold">NGN</p>
            <p className="text-gray-400 text-lg font-semibold">Naira</p>
          </div>
          <div className="grid grid-cols-4 gap-4 w-6/12">
            <TransactionButtons text="Send" icon={<Send />} />
            <TransactionButtons text="Recieve" icon={<Deposit />} />
            <TransactionButtons text="Withdraw" icon={<Send />} />
            <TransactionButtons text="Fund" primary={true} icon={<Deposit />} />
          </div>
        </div>

        <div className="mt-2 px-8 pb-8">
          <p className="text-gray-400">Total Balance</p>
          <p className="font-bold text-5xl">
            1,234.23{" "}
            <span className="text-4xl font-bold -mb-2 inline-block">USDT</span>
          </p>
          <p className="mt-4 text-gray-600 text-lg">
            0.000{" "}
            <span className="bg-gray-700 text-white py-2 px-2 text-sm rounded-lg mx-3">
              BTC
            </span>{" "}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <TransactionTable showHeader={true} />
      </div>
    </div>
  );
};

export default TransactionTrade;
