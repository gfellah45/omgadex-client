// @ts-nocheck
import React, { useState } from "react";
import ArrowBack from "../../../assets/svg/ArrowBack";
import Deposit from "../../../assets/svg/Deposit";
import FiatNaira from "../../../assets/svg/FiatNaira";
import Send from "../../../assets/svg/Send";
import { TransactionButtons } from "../../../components/shared/Buttons";
import { useRouter } from "next/router";
import TransactionTable from "../../../components/shared/TransactionTable";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStoreHooks";
import { CurrencyFormatter } from "../../../lib/currencyFormatter";
import { hideModal, showModal } from "../../../reducers/ui";
import AppModal from "../../../modals";
import FundSuccess from "../FundSuccess";
import FundWallet from "../FundWallet";
import { useRedeemVoucherMutation } from "../../../services/vouchers";

type AmountFunded = {
  amountInDollars: string;
  amountInNaira: string;
};

const TransactionTrade = () => {
  const { back, push } = useRouter();

  const [amountFunded, setAmountFunded] = useState<AmountFunded>({
    amountInDollars: "",
    amountInNaira: "",
  });

  const { theme } = useTheme();

  const { dollarBalance, equivalentBTC } = useAppSelector(
    (state) => state.dashboard.user.payload.walletInfo
  );

  const dispatch = useAppDispatch();

  function openModal() {
    dispatch(showModal({ showModal: true }));
  }
  function closeModal() {
    dispatch(hideModal());
  }
  const [redeem, { isLoading, isError, data, isSuccess: isSuccessR, error }] =
    useRedeemVoucherMutation();

  const routeToBuy = () => {
    push("/wallets/buy");
  };

  const routeToSell = () => {
    push("/wallets/sell");
  };

  return (
    <div className="flex flex-1 flex-col h-full px-6 md:px-8 py-6">
      <div
        className={clsx("rounded-2xl shadow-sm", theme === "light" ? "bg-white" : "bg-neutral-800")}
      >
        <div className="flex justify-between flex-wrap items-center px-6 py-4">
          <div className="flex flex-wrap space-x-2 items-center w-full md:w-5/12">
            <p className="cursor-pointer" onClick={() => back()}>
              <ArrowBack />
            </p>
            <p>
              <FiatNaira />
            </p>
            <p className="text-4xl font-bold">NGN</p>
            <p className="text-gray-400 text-lg font-semibold">Naira</p>
          </div>
          <div className="grid mt-3 md:mt-0 grid-cols-2 md:grid-cols-4 w-full md:mx-0 gap-4 md:w-6/12">
            <TransactionButtons text="Buy" icon={<Send />} action={routeToBuy} />
            <TransactionButtons text="Sell" icon={<Deposit />} action={routeToSell} />
            <TransactionButtons text="Withdraw" icon={<Send />} />
            <TransactionButtons text="Fund" primary={true} icon={<Deposit />} action={openModal} />
          </div>
        </div>

        <div className="mt-2 px-8 pb-8">
          <p className="text-gray-400">Total Balance</p>
          <p className="font-bold text-5xl space-x-2">
            {CurrencyFormatter("USD").format(dollarBalance)}
            <span className="text-4xl font-bold -mb-2 inline-block ml-2"></span>
          </p>
          <p className="mt-4 text-gray-600 text-lg">
            {Number(equivalentBTC).toFixed(8)}
            <span className="bg-gray-700 text-white py-2 px-2 text-sm rounded-lg mx-3">
              BTC
            </span>{" "}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <TransactionTable showHeader={true} />
      </div>
      <AppModal>
        <>
          {isSuccessR && (
            <div>
              <FundSuccess amount={amountFunded.amountInNaira} action={closeModal} />
            </div>
          )}
          {!isSuccessR && (
            <FundWallet
              redeem={redeem}
              isLoading={isLoading}
              isError={isError}
              action={closeModal}
              isSuccess={isSuccessR}
              error={error}
              setAmountFunded={setAmountFunded}
            />
          )}
        </>
      </AppModal>
    </div>
  );
};

export default TransactionTrade;
