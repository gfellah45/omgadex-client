// @ts-nocheck
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import React from 'react';
import Close from '../../assets/svg/Close';
import Eth from '../../assets/svg/Eth';
import Ripple from '../../assets/svg/Ripple';
import Tether from '../../assets/svg/Tether';

const availableCoinList: {
  shortHand: string;
  fullName: string;
  logo: JSX.Element;
}[] = [
  {
    shortHand: 'USDT',
    fullName: 'USD Tether',
    logo: <Tether width="40" height="40" />,
  },
  {
    shortHand: 'ETH',
    fullName: 'Ethereum',
    logo: <Eth width="40" height="40" />,
  },
  {
    shortHand: 'LRXP',
    fullName: 'Ripple',
    logo: <Ripple width="40" height="40" />,
  },
];

interface Props {
  action: () => void;
  title: string;
  changeCoin?: any;
}

const AvailableCoins = ({
  shortHand,
  fullName,
  logo,
  onClick,
}: {
  shortHand: string;
  fullName: string;
  logo: JSX.Element;
  onClick?: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <>
      <div
        onClick={onClick}
        className={clsx(
          'flex items-center group rounded-sm p-3 gap-3 w-12/12 cursor-pointer',
          theme === 'light' ? 'hover:bg-neutral-100' : 'hover:bg-neutral-600',
        )}
      >
        <div>{logo}</div>
        <div className="">
          <p className="text-gray-500">{shortHand}</p>
          <p className="text-gray-500">{fullName}</p>
        </div>
      </div>
    </>
  );
};

const SelectCoin = ({ action, title, changeCoin }: Props) => {
  return (
    <div className="w-full">
      <div>
        <p className="text-2xl font-bold">{title}</p>
      </div>
      <div
        onClick={action}
        className=" absolute right-0 top-6 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100 "
      >
        <Close />
      </div>
      <div className="mt-3">
        {availableCoinList.map((item, index) => {
          const { shortHand, fullName, logo } = item;
          return (
            <AvailableCoins
              onClick={() => {
                changeCoin(item);
              }}
              key={index}
              shortHand={shortHand}
              fullName={fullName}
              logo={logo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectCoin;
