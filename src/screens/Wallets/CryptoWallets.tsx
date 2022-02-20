import React, { FC } from "react";
import Tether from "../../assets/svg/Tether";
import { TransactionButtons } from "../../components/shared/Buttons";
import Deposit from "../../assets/svg/Deposit";

import Send from "../../assets/svg/Send";
import { useAppDispatch } from "../../hooks/useStoreHooks";
import { tradeType } from "../../reducers/ui";
import { useRouter } from "next/router";

interface Props {
  icon?: React.ReactElement;
  currency?: string;
  currencyCode?: string;
  balance?: number | string;
  cryptoBalance?: number | string;
  dollarBalance?: number | string;
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
}) => {
  const formatter = (code: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      signDisplay: "never",
    });

  const dispatch = useAppDispatch();

  const { push } = useRouter();

  const sendAction = () => {
    dispatch(
      tradeType({
        tradeType: "Send",
        tradeProps: {
          currency,
          currencyCode,
          balance,
          cryptoBalance,
          dollarBalance,
        },
      })
    );
    push("/wallets/trade");
  };

  const recieveAction = () => {
    dispatch(
      tradeType({
        tradeType: "Recieve",
        tradeProps: {
          currency,
          currencyCode,
          balance,
          cryptoBalance,
          dollarBalance,
        },
      })
    );
    push("/wallets/trade");
  };

  return (
    <div className="bg-white shadow-sm rounded-lg px-10 py-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          {icon}
          <div>
            <p className="text-lg font-bold ">{currency}</p>
            <p className="text-gray-400">{currencyCode}</p>
            <p className="text-sm font-bold">
              {cryptoBalance ? cryptoBalance : "0.00"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Available Balance</p>
          <p className="text-3xl font-semibold">
            {" "}
            {show ? (balance ? balance : "0.00") : "*********"}
          </p>
          <p className="text-gray-500 text-sm">
            {dollarBalance
              ? formatter("USD").format(Number(dollarBalance))
              : "0.00"}{" "}
            USD
          </p>
        </div>
      </div>

      <div className="mt-16 w-full">
        <div className="w-full ml-auto grid grid-cols-3 gap-4">
          <TransactionButtons
            action={sendAction}
            text="Send"
            icon={<Deposit />}
          />
          <TransactionButtons
            action={recieveAction}
            text="Recieve"
            icon={<Deposit />}
          />
          <TransactionButtons text="Trade" icon={<Send />} />
        </div>
      </div>
    </div>
  );
};

export default CryptoWallets;
