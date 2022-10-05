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
import FundSuccess from "../FundSuccess";
import FundWallet from "../FundWallet";
import { useRedeemVoucherMutation } from "../../../services/vouchers";
import AppModal from "../../../modals";
import Close from "../../../assets/svg/Close";
import SuccessBadge from "../../../assets/svg/SuccessBadge";
import CarretDown from "../../../assets/svg/CarretDown";
import { useForm } from "react-hook-form";

// Types of modal on this component are:
const MAKE_WITHDRAWAL_MODAL = "MAKE_WITHDRAWAL_MODAL";
const SUCCESSFUL_WITHDRAWAL_MODAL = "SUCCESSFUL_WITHDRAWAL_MODAL";
const FUND_WALLET_MODAL = "FUND_WALLET_MODAL";

type AmountFunded = {
  amountInDollars: string;
  amountInNaira: string;
};

const TransactionTrade = () => {
  const [selectNetwork, setSeleectedNetwork] = useState<availableNetworkProps | any>({});
  const [amountFunded, setAmountFunded] = useState<AmountFunded>({
    amountInDollars: "",
    amountInNaira: "",
  });
  const { theme } = useTheme();
  const { back, push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("dataa", data);
  };

  const modalType = useAppSelector((state) => state.ui.modalType);

  const { dollarBalance, equivalentBTC } = useAppSelector(
    (state) => state.dashboard.user.payload.walletInfo
  );

  const dispatch = useAppDispatch();

  const handleOpen: (modalType?: string | undefined) => void = (modalType) => {
    dispatch(showModal({ showModal: true, modalType: modalType }));
  };

  function handleClose() {
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
            <TransactionButtons
              text="Withdraw"
              action={() => handleOpen(MAKE_WITHDRAWAL_MODAL)}
              icon={<Send />}
            />
            <TransactionButtons
              text="Fund"
              primary={true}
              icon={<Deposit />}
              action={() => handleOpen(FUND_WALLET_MODAL)}
            />
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
          {isSuccessR && modalType === FUND_WALLET_MODAL && (
            <div>
              <FundSuccess amount={amountFunded.amountInNaira} action={handleClose} />
            </div>
          )}
          {!isSuccessR && modalType === FUND_WALLET_MODAL && (
            <FundWallet
              redeem={redeem}
              isLoading={isLoading}
              isError={isError}
              action={handleClose}
              isSuccess={isSuccessR}
              error={error}
              setAmountFunded={setAmountFunded}
            />
          )}
        </>

        {modalType === MAKE_WITHDRAWAL_MODAL && (
          <div className="w-full">
            <>
              <div>
                <p className="text-4xl text-center pt-5 font-bold text-[#353945]">Select Account</p>
              </div>
              <div
                onClick={() => handleClose()}
                className={clsx(
                  "absolute right-[-24px] top-0 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100",
                  theme === "light" ? "bg-neutral-100" : "bg-neutral-600"
                )}
              >
                <Close />
              </div>
            </>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
              <div>
                <p className="text-neutral-400 font-medium text-sm">Bank Account</p>
                <div
                  // onClick={() => handleOpen(SELECT_NETWORK_MODAL)}
                  className="my-4 md:w-full text-gray-400 rounded-md justify-between cursor-pointer flex items-center relative px-2 border h-12 "
                >
                  <div>
                    {Object.keys(selectNetwork).length ? (
                      <div className="flex items-center gap-2">
                        <div>{selectNetwork?.logo}</div>
                        {selectNetwork?.shortHand}
                      </div>
                    ) : (
                      <p>Access Bank</p>
                    )}
                  </div>
                  <div className="aboslute top-2 right-2 ">
                    <CarretDown />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="amount" className="font-light text-neutral-400  text-sm">
                  Account Number
                </label>
                <div
                  className={`mt-2 w-full text-gray-400 rounded-md justify-between cursor-pointer flex items-center relative px-2 border h-12 ${
                    errors["amount"] ? "border-red-600" : ""
                  }`}
                >
                  <input
                    type="text"
                    className="w-full h-full bg-white outline-none border-0"
                    placeholder="0011223344"
                    {...register("amount", { required: true })}
                    name="amount"
                    id="amount"
                  />
                </div>
              </div>

              {/* Acccount name */}
              <div className="w-full mt-2">
                <label htmlFor="amount" className="font-light text-neutral-400  text-sm">
                  Account Name
                </label>
                <div
                  className={`mt-2 w-full text-gray-400 rounded-md justify-between cursor-pointer flex items-center relative px-2 border h-12 ${
                    errors["amount"] ? "border-red-600" : ""
                  }`}
                >
                  <input
                    type="text"
                    className="w-full h-full bg-white outline-none border-0"
                    placeholder="John Doe"
                    {...register("amount", { required: true })}
                    name="amount"
                    id="amount"
                  />
                </div>
              </div>

              <div className="w-full mt-2">
                <label htmlFor="amount" className="font-light text-neutral-400  text-sm">
                  Amount
                </label>
                <div
                  className={`mt-2 w-full text-gray-400 rounded justify-between cursor-pointer flex items-center relative px-2 border h-12 ${
                    errors["amount"] ? "border-red-600" : ""
                  }`}
                >
                  <p className=" pr-1">N</p>

                  <input
                    type="text"
                    className="w-full h-full bg-white outline-none border-0"
                    placeholder="1000"
                    {...register("amount", { required: true })}
                    name="amount"
                    id="amount"
                  />
                </div>
                <p className="text-xs text-neutral-500 my-1">Balance: N1230000</p>
              </div>

              <div className="mx-auto my-3 flex justify-center items-center">
                <button
                  onClick={() => {
                    handleClose();
                    push("/wallets");
                  }}
                  type="submit"
                  className="bg-primary mx-center text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {modalType === SUCCESSFUL_WITHDRAWAL_MODAL && (
          <div className="w-full">
            <div>
              <p className="text-xl text-center pt-5 font-bold text-[#353945]">
                Withdrawal Successful
              </p>
            </div>
            <div
              onClick={() => handleClose()}
              className={clsx(
                "absolute right-[-24px] top-0 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100",
                theme === "light" ? "bg-neutral-100" : "bg-neutral-600"
              )}
            >
              <Close />
            </div>

            <p className="flex justify-center items-center">
              <SuccessBadge size={220} />
            </p>

            <p className="font-bold text-center text-5xl mt-3 mb-5">N100,234,089</p>

            <p className="text-center text-md">
              Your withdrawal was successful and your account has been credited
            </p>
            <div className="mx-auto my-3 flex justify-center items-center">
              <button
                onClick={() => {
                  handleClose();
                  push("/wallets");
                }}
                type="submit"
                className="bg-primary mx-center text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
              >
                Back To Wallet
              </button>
            </div>
          </div>
        )}
      </AppModal>
    </div>
  );
};

export default TransactionTrade;
