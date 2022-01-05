import React, { FC } from "react";
import Tether from "../../assets/svg/Tether";
import { TransactionButtons } from "../../components/shared/Buttons";
import Deposit from "../../assets/svg/Deposit";

import Send from "../../assets/svg/Send";

interface Props {
  icon?: React.ReactElement;
  currency?: string;
  currencyCode?: string;
  balance?: string;
  cryptoBalance?: string;
  dollarBalance?: string;
  show?: boolean;
  action?: () => void;
}

const CryptoWallets: FC<Props> = ({
  icon,
  currency,
  currencyCode,
  balance,
  cryptoBalance,
  dollarBalance,
  show,
  action,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-lg px-10 py-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          {icon}
          <div>
            <p className="text-lg font-bold ">{currency}</p>
            <p className="text-gray-400">{currencyCode}</p>
            <p className="text-sm font-bold">{cryptoBalance}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Available Balance</p>
          <p className="text-3xl font-semibold">
            {" "}
            {show ? balance : "*********"}
          </p>
          <p className="text-gray-500 text-sm">{dollarBalance}</p>
        </div>
      </div>

      <div className="mt-16 w-full">
        <div className="w-full ml-auto grid grid-cols-3 gap-4">
          <TransactionButtons text="Send" icon={<Deposit />} />
          <TransactionButtons text="Recieve" icon={<Deposit />} />
          <TransactionButtons text="Trade" icon={<Send />} />
        </div>
      </div>
    </div>
  );
};

export default CryptoWallets;
