import React from "react";
import ArrowRight from "../../assets/svg/ArrowRight";
import Binance from "../../assets/svg/Binance";
import Btc from "../../assets/svg/Btc";
import Eth from "../../assets/svg/Eth";
import LineChart from "../../assets/svg/LineChart";
import Path from "../../assets/svg/Path";
import Withdraw from "../../assets/svg/Withdraw";
import { useAppSelector } from "../../hooks/useStoreHooks";
import CoinCard from "./CoinCard";
import WithdrawCard from "./WithdrawCard";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { push } = useRouter();
  const CryptoData = [
    {
      name: "Bitcoin",
      value: "18,245.4 USD",
      icon: <Btc />,
      initials: "BTC",
      chart: <LineChart />,
      percentage: "+2.73%",
    },
    {
      name: "Ethereum",
      value: "4200.6 USD",
      icon: <Eth />,
      initials: "ETH",
      chart: <LineChart />,
      percentage: "+2.73%",
    },
    {
      name: "Binance coin",
      value: "4200.6 USD",
      icon: <Binance />,
      initials: "BNB",
      chart: <LineChart />,
      percentage: "+2.73%",
    },
  ];

  const withdrawData = [
    {
      method: "Withdrew USDT",
      status: "Complete", // Complete, Pending, Failed
      amount: "969.06654889 USDT",
      date: "Nov 22, 2020",
    },
    {
      method: "Withdrew USDT",
      status: "Complete", // Complete, Pending, Failed
      amount: "969.06654889 USDT",
      date: "Nov 22, 2020",
    },
  ];
  const { firstName } = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex flex-1 flex-col w-full h-auto px-10">
      <div className="bg-primary text-white rounded-lg mt-5 shadow-sm shadow-primary py-8 px-10 w-full">
        <div className=" text-5xl font-bold">Hello {firstName},</div>
        <p>Welcome to your Dashborad</p>
      </div>

      {/* cards */}

      <div className=" grid grid-cols-3 gap-6 mt-8">
        {CryptoData.map((data, index) => (
          <CoinCard {...data} key={index} />
        ))}
      </div>

      <div className=" grid grid-cols-3 mt-8 gap-6 ">
        <div className=" col-span-2 bg-white py-8 rounded-lg shadow-sm">
          <div className=" text-neutral-500 text-2xl font-semibold px-8">
            Recent Transactions
          </div>
          <div className="h-px bg-gray-300 mx-2  mt-5"></div>
          <div className="mt-10 ">
            {withdrawData.map((data, index) => (
              <WithdrawCard {...data} key={index} />
            ))}
          </div>
          <div
            className="px-8 flex items-center space-x-5"
            onClick={() => push("/transactions")}
          >
            <ArrowRight />
            <p className="text-blue-500">View all activity</p>
          </div>
        </div>
        {/* wallet overview */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <p className=" text-3xl font-bold text-center mt-4">
              Wallet Overview
            </p>
          </div>
          <div className="  flex justify-center items-center mt-20">
            <div className=" space-y-3 ">
              <p className=" text-neutral-400 text-sm font-medium">
                Total balance
              </p>
              <p className="text-[40px] font-bold ">N1,234,089</p>
              <p className=" text-neutral-500 ">
                0.27894652{" "}
                <span className="text-white mx-4 bg-green-500 p-2 rounded-md">
                  BTC
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
