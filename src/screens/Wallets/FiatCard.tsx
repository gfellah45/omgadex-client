import React, { FC } from "react";
import Deposit from "../../assets/svg/Deposit";
import FiatNaira from "../../assets/svg/FiatNaira";
import Send from "../../assets/svg/Send";
import { TransactionButtons } from "../../components/shared/Buttons";

interface Props {
  icon?: React.ReactElement;
  currency?: string;
  currencyCode?: string;
  balance?: string;
  action?: () => void;
  show?: boolean;
}

const FiatCard: FC<Props> = ({
  icon,
  currency,
  currencyCode,
  balance,
  action,
  show,
}) => {
  return (
    <div className="bg-white rounded-lg px-10 py-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          {icon}
          <div>
            <p className="text-lg font-bold ">{currency}</p>
            <p className="text-gray-400">{currencyCode}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Available Balance</p>
          <p className="text-3xl font-semibold">
            {show ? balance : "*********"}
          </p>
        </div>
      </div>

      <div className="mt-16 w-full">
        <div className="w-9/12 ml-auto grid grid-cols-3 gap-4">
          <TransactionButtons text="Send" icon={<Deposit />} />
          <TransactionButtons text="Recieve" icon={<Deposit />} />
          <TransactionButtons
            text="Fund"
            primary={true}
            icon={<Send />}
            action={action}
          />
        </div>
      </div>
    </div>
  );
};

export default FiatCard;
