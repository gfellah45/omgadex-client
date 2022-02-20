import React, { useEffect } from "react";
import ArrowRight from "../../assets/svg/ArrowRight";
import Binance from "../../assets/svg/Binance";
import Btc from "../../assets/svg/Btc";
import Eth from "../../assets/svg/Eth";
import LineChart from "../../assets/svg/LineChart";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import CoinCard from "./CoinCard";
import WithdrawCard from "./WithdrawCard";
import { useRouter } from "next/router";
import { useGetUserInfoQuery } from "../../services/dashboard";
import { saveUserInfo } from "../../reducers/dashboard";
import Loader from "react-loader-spinner";
import EmptyState from "../../assets/svg/EmptyState";

const Dashboard = () => {
  const { push } = useRouter();

  const { data, isLoading } = useGetUserInfoQuery();

  const dispatch = useAppDispatch();

  const user = useAppSelector(({ dashboard }) => dashboard.user);

  useEffect(() => {
    if (data) {
      dispatch(saveUserInfo(data));
    }
  }, [data]);

  const { firstName } = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex flex-1 flex-col w-full h-auto px-10">
      <div className="bg-primary text-white rounded-lg mt-5 shadow-sm shadow-primary py-8 px-10 w-full">
        <div className=" text-5xl font-bold">Hello {firstName},</div>
        <p>Welcome to your Dashborad</p>
      </div>

      {/* cards */}

      <div className=" grid grid-cols-3 gap-6 mt-8">
        {/* {CryptoData.map((user, index) => (
          <CoinCard {...user} key={index} />
        ))} */}
        <CoinCard
          name={"BTC"}
          value={user?.payload.currentCryptoPrices.BTC.price || ""}
          percentage={
            user?.payload.currentCryptoPrices.BTC.price_change_percentage_24h ||
            ""
          }
          icon={<Btc />}
          chart={<LineChart />}
          initials={"BTC"}
        />
        <CoinCard
          name={"ETH"}
          value={user?.payload.currentCryptoPrices.ETH.price || ""}
          percentage={
            user?.payload.currentCryptoPrices.ETH.price_change_percentage_24h ||
            ""
          }
          icon={<Eth />}
          chart={<LineChart />}
          initials={"ETH"}
        />
        <CoinCard
          name={"Binace coin"}
          value={user?.payload.currentCryptoPrices.BNB.price || ""}
          percentage={
            user?.payload.currentCryptoPrices.BNB.price_change_percentage_24h ||
            ""
          }
          icon={<Binance />}
          chart={<LineChart />}
          initials={"BNB"}
        />
      </div>

      <div className=" grid grid-cols-3 mt-8 gap-6 h-6/12 ">
        <div className=" col-span-2 bg-white py-8 rounded-lg shadow-sm">
          <div className=" text-neutral-500 text-2xl font-semibold px-8">
            Recent Transactions
          </div>
          <div className="h-px bg-gray-300 mx-2  mt-5"></div>
          {!isLoading && (
            <div className="mt-10 ">
              {user?.payload.recentTransactions.map(
                (user: IRecentTrx, index: number) => (
                  <WithdrawCard {...user} key={index} />
                )
              )}
            </div>
          )}

          {!isLoading && user?.payload.recentTransactions.length === 0 && (
            <div className="flex justify-center flex-1 h-auto my-16 flex-col items-center w-full ">
              <EmptyState width="100" height="80" />
              <p className="my-4">No Transaction History</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-1 w-full h-full  justify-center item-center">
              <Loader type="Rings" color="#3772FF" height={100} width={120} />
            </div>
          )}

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
          <div className="  flex justify-center items-center mt-12">
            <div className=" space-y-3 ">
              <p className=" text-neutral-400 text-sm font-medium">
                Total balance
              </p>
              <p className="text-[40px] font-bold ">
                {user?.payload.walletInfo.balance}
              </p>
              <p className=" text-neutral-500 ">
                {user?.payload.walletInfo.equivalentBTC.toPrecision(7)} USDT
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
