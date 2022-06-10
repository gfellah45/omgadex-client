// @ts-nocheck
import React, { useEffect } from 'react';
import ArrowRight from '../../assets/svg/ArrowRight';
import Binance from '../../assets/svg/Binance';
import Btc from '../../assets/svg/Btc';
import Eth from '../../assets/svg/Eth';
import LineChart from '../../assets/svg/LineChart';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import CoinCard from './CoinCard';
import WithdrawCard from './WithdrawCard';
import { useRouter } from 'next/router';
import { useGetUserInfoQuery } from '../../services/dashboard';
import { saveUserInfo } from '../../reducers/dashboard';
import Loader from 'react-loader-spinner';
import EmptyState from '../../assets/svg/EmptyState';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { CurrencyFormatter } from '../../lib/currencyFormatter';

const Dashboard = () => {
  const { push } = useRouter();

  const { data, isLoading } = useGetUserInfoQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(saveUserInfo(data));
    }
  }, [data, dispatch]);

  const { firstName } = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex flex-col flex-1 w-full h-auto px-10">
      <div
        className={clsx(
          'w-full px-10 py-8 mt-5 text-white  rounded-lg shadow-sm bg-primary shadow-primary',
        )}
      >
        <div>
          <div className="text-5xl font-bold ">Hello {firstName}</div>
          <p>Welcome to your Dashborad</p>
        </div>
      </div>

      {/* cards */}

      <div className="grid grid-cols-3 gap-6 mt-8 ">
        {/* {CryptoData.map((user, index) => (
          <CoinCard {...user} key={index} />
        ))} */}
        <CoinCard
          name={'BTC'}
          value={data?.payload.currentCryptoPrices.BTC.price || ''}
          percentage={
            data?.payload.currentCryptoPrices.BTC.price_change_percentage_24h ||
            ''
          }
          icon={<Btc />}
          chart={<LineChart />}
          initials={'BTC'}
        />
        <CoinCard
          name={'ETH'}
          value={data?.payload.currentCryptoPrices.ETH.price || ''}
          percentage={
            data?.payload.currentCryptoPrices.ETH.price_change_percentage_24h ||
            ''
          }
          icon={<Eth />}
          chart={<LineChart />}
          initials={'ETH'}
        />
        <CoinCard
          name={'Binace coin'}
          value={data?.payload.currentCryptoPrices.BNB.price || ''}
          percentage={
            data?.payload.currentCryptoPrices.BNB.price_change_percentage_24h ||
            ''
          }
          icon={<Binance />}
          chart={<LineChart />}
          initials={'BNB'}
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8  h-6/12">
        <div
          className={clsx(
            'col-span-2 py-8 rounded-lg shadow-sm',
            theme === 'light' ? 'bg-white' : 'bg-neutral-800',
          )}
        >
          <div className="px-8 text-2xl font-semibold  text-neutral-500">
            Recent Transactions
          </div>
          <div className="h-px mx-2 mt-5 bg-gray-300"></div>
          {!isLoading && (
            <div className="mt-10 ">
              {data?.payload.recentTransactions
                .slice(0, 2)
                .map((user: IRecentTrx, index: number) => (
                  <WithdrawCard {...user} key={index} />
                ))}
            </div>
          )}

          {!isLoading && data?.payload.recentTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 w-full h-auto my-16 ">
              <EmptyState width="100" height="80" />
              <p className="my-4">No Transaction History</p>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center flex-1 w-full h-full item-center">
              <Loader type="Rings" color="#3772FF" height={100} width={120} />
            </div>
          )}

          <div
            className="flex items-center px-8 space-x-5"
            onClick={() => push('/transactions')}
          >
            <ArrowRight />
            <p
              className={clsx(
                theme === 'light' ? 'text-blue-500' : 'text-gray-300',
              )}
            >
              View all activity
            </p>
          </div>
        </div>
        {/* wallet overview */}
        <div
          className={clsx(
            'col-span-1 p-6  rounded-lg shadow-sm',
            theme === 'light' ? 'bg-white' : 'bg-neutral-800',
          )}
        >
          <div>
            <p className="mt-4 text-3xl font-bold text-center ">
              Wallet Overview
            </p>
          </div>
          <div className="flex items-center justify-center mt-12 ">
            <div className="space-y-3 w-11/12">
              <p className="text-sm font-medium  text-neutral-400">
                Total balance
              </p>
              <p className="text-[40px] font-bold  w-12/12">
                {CurrencyFormatter('USD').format(
                  Number(data?.payload?.walletInfo?.dollarBalance),
                )}
              </p>
              <p className=" text-neutral-500">
                {data?.payload.walletInfo.equivalentBTC.toPrecision(7)} USDT
                <span className="p-2 mx-4 text-white bg-green-500 rounded-md">
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
