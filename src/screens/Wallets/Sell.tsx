import React, { useState } from "react";
import ArrowBack from "../../assets/svg/ArrowBack";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { useRouter } from "next/router";
import CarretDown from "../../assets/svg/CarretDown";
import AppModal from "../../modals";
import { availableNetwork, availableNetworkProps } from "./Send";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { hideModal, showModal } from "../../reducers/ui";
import { useForm } from "react-hook-form";
import Close from "../../assets/svg/Close";
import { useBuyOrSellCryptoMutation } from "../../services/sendCrypto";
import toast, { Toaster } from "react-hot-toast";
import SuccessBadge from "../../assets/svg/SuccessBadge";
import SmallBTC from "../../assets/svg/SmallBTC";
import SmallETH from "../../assets/svg/SmallETH";
import Loader from "react-loader-spinner";

const BUYING_PENDING = "BUYING_PENDING";
const BUYING_IN_PROGRESS = "BUYING_IN_PROGRESS";
const BUYING_RESOLVED = "BUYING_RESOLVED";
const BUYING_REJECTED = "BUYING_REJECTED";

// Types of modal on this component are:
const SELECT_NETWORK_MODAL = "SELECT_NETWORK_MODAL";
const CRYPTO_STATUS_MODAL = "CRYPTO_STATUS_MODAL";

function Sell() {
  const { theme } = useTheme();
  const { back, push } = useRouter();
  const [selectNetwork, setSeleectedNetwork] = useState<availableNetworkProps | any>({});

  const [buyCrptoStatus, setBuyCrptoStatus] = useState("idle");
  const modalType = useAppSelector((state) => state.ui.modalType);

  const [buyCrypto, { isLoading }] = useBuyOrSellCryptoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(hideModal());
  };
  const handleOpen: (modalType?: string | undefined) => void = (modalType) => {
    dispatch(showModal({ showModal: true, modalType: modalType }));
  };

  const onSubmit = (data: any) => {
    for (let value in data) {
       if (!data[value].length) {
         toast.error("You cant submit an empty form");
       }
     }
    handleOpen(CRYPTO_STATUS_MODAL);
    setBuyCrptoStatus(BUYING_IN_PROGRESS);
    buyCrypto({ ...data, type: "sell" })
      .unwrap()
      .then((res) => {
        toast.success("Trade successful");
        setBuyCrptoStatus(BUYING_RESOLVED);
        handleOpen(CRYPTO_STATUS_MODAL);
        console.error(res);
      })
      .catch((err) => {
        toast.error("Trade gone wrong, try again");
        setBuyCrptoStatus(BUYING_REJECTED);
        handleOpen(CRYPTO_STATUS_MODAL);
        console.log(err, "there was an error while trying to buy crypto");
      });
  };

  return (
    <>
      <div className=" px-8 w-full h-full">
        <div
          className={clsx(
            "bg-white py-8 px-7 rounded-xl flex items-center space-x-4",
            theme === "light" ? "bg-offwhite" : "bg-neutral-800"
          )}
        >
          <div onClick={() => back()} className="cursor-pointer">
            <ArrowBack />
          </div>
          <div className="text-3xl font-bold capitalize">Sell BTC</div>
        </div>

        <div className="overflow-hidden h-[450px] mt-10 ">
          <div
            className={clsx(
              "flex flex-1 overflow-y-auto flex-col px-8 h-full rounded-xl text-xl ",
              theme === "light" ? "bg-white" : "bg-neutral-800"
            )}
          >
            <div className="text-[19px] my-8">Select wallet to receive with</div>
            <div className="flex flex-col md:flex-row justify-between flex-wrap items-stretch ">
              <form onSubmit={handleSubmit(onSubmit)} className="md:w-[60%] ">
                <div>
                  <p className="text-neutral-400 font-light text-md">Wallet</p>
                  <div
                    onClick={() => handleOpen(SELECT_NETWORK_MODAL)}
                    className="my-4 w-10/12 text-gray-400 rounded justify-between cursor-pointer flex items-center relative px-2 border h-12 "
                  >
                    <div>
                      {Object.keys(selectNetwork).length ? (
                        <div className="flex items-center gap-2">
                          <div>{selectNetwork?.logo}</div>
                          {selectNetwork?.shortHand}
                        </div>
                      ) : (
                        <p>Select Wallet</p>
                      )}
                    </div>
                    <div className="aboslute top-2 right-2 ">
                      <CarretDown />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-x-5 my-5 w-10/12">
                  <div className="w-6/12">
                    <label htmlFor="amount" className="font-light text-neutral-400  text-[1rem]">
                      Amount to pay
                    </label>
                    <div className="mt-2 w-full text-gray-400 rounded justify-between cursor-pointer flex items-center relative px-2 border h-12">
                      <input
                        type="text"
                        className="w-10/12 h-full outline-none bg-transparent border-0"
                        placeholder="0.0001"
                        {...register("amount", { required: true })}
                        name="amount"
                        id="amount"
                      />
                      <p>BTC</p>
                    </div>
                    <p className="text-xs text-neutral-500 my-1">
                      Available Balance: <b>0.1780 BTC</b>
                    </p>
                  </div>
                  <div className="w-6/12">
                    <label htmlFor="eth_amount" className="font-light text-neutral-400 text-[1rem]">
                      Recieve
                    </label>
                    <div className="mt-2 w-full text-gray-400 rounded justify-between cursor-pointer flex items-center relative px-2 border h-12">
                      <input
                        type="text"
                        className="w-10/12 h-full bg-transparent outline-none border-0"
                        placeholder="1000"
                        {...register("eth_amount", { required: true })}
                        name="eth_amount"
                        id="eth_amount"
                      />
                      <p>NGN</p>
                    </div>
                    <p className="text-xs text-neutral-500 my-1">
                      0.90 USD at<b> N580/USD</b>
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className={clsx(
                      "text-center w-6/12 text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer",
                      isLoading ? "bg-secondary" : "bg-primary"
                    )}
                  >
                    {/* {status1.isLoading ? "Sending..." : "Send"} */}
                    Sell
                  </button>
                </div>
              </form>
              <div className="md:w-[40%]">
                <div
                  className={clsx(
                    " shadow rounded-lg w-10/12 ml-auto p-5",
                    theme === "light" ? "bg-gray-200" : "bg-neutral-700"
                  )}
                >
                  <div className="flex items-start flex-col">
                    <p className="font-bold text-sm">You are Selling</p>
                    <p className="flex justify-start gap-x-2 items-center">
                      <span className="text-gray-500 font-bold text-2xl">0.0001</span>
                      <span className="text-xl">BTC</span>
                    </p>
                  </div>
                  <div className="mt-6 mb-3">
                    <p className="font-bold text-sm text-gray-500">You will receive</p>
                    <div className="text-2xl font-bold my-3">
                      <p>
                        10000 <span>NGN</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3 items-center">
                    <p className="text-gray-400 text-base">0.90 USD at N580/USD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppModal>
        {modalType === SELECT_NETWORK_MODAL && (
          <div className="w-full">
            <div>
              <p className="text-xl font-bold">Select Network</p>
            </div>
            <div
              onClick={() => handleClose()}
              className={clsx(
                "absolute right-0 top-6 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100",
                theme === "light" ? "bg-neutral-100" : "bg-neutral-600"
              )}
            >
              <Close />
            </div>

            <p className="text-sm my-2 font-smeibold">
              Ensure the network you choose to deposit matches the withdrawal network, or assets may
              be lost.
            </p>

            <div>
              {availableNetwork?.map((network, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSeleectedNetwork(network);
                    handleClose();
                  }}
                  className={clsx(
                    "flex items-center justify-between group rounded-sm p-3 gap-3 w-12/12 cursor-pointer",
                    theme === "light" ? "hover:bg-neutral-100" : "hover:bg-neutral-600"
                  )}
                >
                  <div className="flex gap-3">
                    <div>{network.logo}</div>
                    <div className="">
                      <p className="text-gray-500">{network.shortHand}</p>
                      <p className="text-gray-500">{network.fullName}</p>
                    </div>
                  </div>
                  <p className="text-sm">{network.fee}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {modalType === CRYPTO_STATUS_MODAL && (
          <div>
            {buyCrptoStatus === BUYING_IN_PROGRESS && (
              <div className="flex flex-col my-3 text-center justify-center items-center">
                {/* <p>Your transaction has been signed successfully</p> */}
                <p>Trying to Process your transaction</p>
                <div className="my-2">
                  <Loader type="Audio" color="#683a9e" height={40} width={60} />
                </div>
              </div>
            )}
            {buyCrptoStatus === BUYING_RESOLVED && (
              <div>
                <p className="flex justify-center items-center">
                  <SuccessBadge />
                </p>
                <p className="text-2xl mb-2 text-center font-smeibold">Transfer successful!</p>

                <p className="text-sm justify-center text-center my-2 items-center flex gap-1 font-smeibold">
                  <SmallETH />
                  <span>10000 Eth have been transfered successfully!</span>
                </p>
              </div>
            )}
            {buyCrptoStatus === BUYING_REJECTED && (
              <div className="my-3 text-center">Something went wrong please try again</div>
            )}

            <div className="mx-auto my-3 flex justify-center items-center">
              <button
                onClick={() => {
                  handleClose();
                  push("/wallets");
                }}
                type="submit"
                className="bg-primary mx-center text-center w-6/12 text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
              >
                Back To Wallet
              </button>
            </div>
          </div>
        )}
      </AppModal>
      <Toaster />
    </>
  );
}

export default Sell;
