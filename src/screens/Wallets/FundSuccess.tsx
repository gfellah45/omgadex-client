// @ts-nocheck
import Link from 'next/link';
import React, { FC } from 'react';
import Close from '../../assets/svg/Close';
import SuccessBadge from '../../assets/svg/SuccessBadge';

interface Props {
  action?: () => void;
  amount: string | number;
}

const FundSuccess: FC<Props> = ({ action, amount }) => {
  return (
    <div className="w-full">
      <div
        onClick={action}
        className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-6"
      >
        <Close />
      </div>

      <div className="flex flex-col items-center justify-center">
        <SuccessBadge />

        <div className="relative">
          <span className="absolute top-0 left-0 text-3xl font-bold">
            &#8358;
          </span>
          <p className="font-bold text-6xl mx-6">
            {amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="my-4">
          Your Fiat Wallet has been credited successfully!
        </div>
        <div>
          <button
            onClick={action}
            className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded-lg hover:bg-blue-600"
          >
            Fund Again
          </button>
        </div>
        <div className="my-8">
          <Link href="/wallets">
            <a className="text-blue-600">Check Wallet Balance</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FundSuccess;
