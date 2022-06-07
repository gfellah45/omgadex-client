import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import ArrowBack from "../../assets/svg/ArrowBack";
import { useRouter } from "next/router";
import CarretDown from "../../assets/svg/CarretDown";
import SelectCoin from "./SelectCoin";
import SmallNaira from "../../assets/svg/SmallNaira";
import SmallBTC from "../../assets/svg/SmallBTC";
import SmallETH from "../../assets/svg/SmallETH";
import SmallTether from "../../assets/svg/SmallTether";
import SmallXRP from "../../assets/svg/SmallXRP";
import SmallBNB from "../../assets/svg/SmallBNB";
import Tether from "../../assets/svg/Tether";
import AppModal from "../../modals";
import { hideModal, showModal } from "../../reducers/ui";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import Eth from "../../assets/svg/Eth";
import Btc from "../../assets/svg/Btc";
import Binance from "../../assets/svg/Binance";
import Ripple from "../../assets/svg/Ripple";
import FiatNaira from "../../assets/svg/FiatNaira";
import Close from "../../assets/svg/Close";
import {
  useSignTransactionMutation,
  useSendTransactionMutation,
  useRecieveTransactionMutation,
  useVerifyTransactionMutation,
} from "../../services/sendCrypto";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import SuccessBadge from "../../assets/svg/SuccessBadge";
import CopyIcon from "../../assets/svg/CopyIcon";
import QRCode from "react-qr-code";
import Loader from "react-loader-spinner";

export interface availableNetworkProps {
  shortHand: string;
  fullName: string;
  properShortHand: string;
  logo: JSX.Element;
  fee: string;
}

export const availableNetwork: availableNetworkProps[] = [
  {
    shortHand: "eth",
    properShortHand: "ETH",
    fullName: "Ethereum",
    logo: <Eth width="40" height="40" />,
    fee: "Fee 0.80 eth",
  },
  {
    shortHand: "lxrp",
    fullName: "Ripple",
    properShortHand: "XRP",
    logo: <Ripple width="40" height="40" />,
    fee: "Fee 0.80 lxrp",
  },
  {
    shortHand: "lusdt",
    fullName: "USDT",
    properShortHand: "USDT",
    logo: <Tether width="40" height="40" />,
    fee: "Fee 0.80 eth",
  },
];

export interface selectedCoinType {
  shortHand: string;
  fullName: string;
  logo: JSX.Element;
}

const SELECT_COIN_MODAL = "SELECT_COIN";
const SELECT_NETWORK_MODAL = "SELECT_NETWORK_MODAL";
const TRANSFER_SUCCESSFUL_MODAL = "TRANSFER_SUCCESSFUL_MODAL";

// RECIEVE NETWORK
const UNINITIALIZED = "UNINITIALIZED";
const INITIALIZED = "INITIALIZED";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";

const TRXN_SIGN_INITIALIZED = "TRXN_SIGN_INITIALIZED";
const TRXN_SIGN_APPROVED = "TRXN_SIGNED";
const TRXN_SIGN_REJECTED = "TRXN_FAILED";
const TRXN_SEND_RESOLVED = "TRXN_SEND_RESOLVED";
const TRXN_SEND_REJECTED = "TRXN_SEND_REJECTED";

const Send = () => {
  const [selectedCoin, setSelectedCoin] = useState<selectedCoinType | any>({});
  const [selectNetwork, setSeleectedNetwork] = useState<
    availableNetworkProps | any
  >({});
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(UNINITIALIZED);
  const [availableBalance, setAvailableBalance] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [signedTrxnState, setSignedTrxnState] = useState(TRXN_SIGN_INITIALIZED);
  const { theme } = useTheme();
  const [verifyTrxStatus, setVerifyTrxStatus] = useState(false);
  const dispatch = useAppDispatch();
  const [signedResponse, setSignedResponse] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { back, push } = useRouter();

  const handleOpen: (modalType?: string | undefined) => void = (modalType) => {
    dispatch(showModal({ showModal: true, modalType: modalType }));
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address successfully Copied");
  };

  const [sign, status1] = useSignTransactionMutation();
  const [send, status] = useSendTransactionMutation();
  const [recieve, recieveStatus] = useRecieveTransactionMutation();
  const [verifyTransaction, { isLoading: loadingVerifyTransaction }] =
    useVerifyTransactionMutation();

  const goReceiveMyCoins = async () => {
    setLoading(INITIALIZED);
    const extraParams = {
      token: selectedCoin?.shortHand.toLowerCase(),
      network: "erc-20",
    };
    recieve(extraParams)
      .unwrap()
      .then((res: any) => {
        setAvailableBalance(res.payload.balance);
        setReceiverAddress(res.payload.address);
        setLoading(RESOLVED);
        toast.success("Payment Recieved successfully");
      })
      .catch(() => {
        setLoading(REJECTED);
        toast.error("Something went wrong, please try again shortly");
      });
  };

  // verify transaction function
  const verifyTransactionInterval = async (passedInRes: any) => {
    toast.success(
      "transaction is taking to long. you will be notified when its completed"
    );
    let trxTimeOut;
    if (trxTimeOut) {
      clearTimeout(trxTimeOut);
    } else {
      trxTimeOut = setTimeout(() => {
        verifyTransaction({
          txHash: passedInRes?.payload.txHash,
        })
          .unwrap()
          .then((res: any) => {
            if (res?.message.includes("successful")) {
              console.log(
                res.message,
                "successfull is included to your response"
              );
              toast.success("Transaction is successful");
            } else {
              toast.success(res?.message);
            }
          })
          .catch((err: any) => {
            console.log(err, "error trying to verify your transaction");
          });
      }, 10000);
    }
  };

  const onSubmit = (data: any) => {
    const extraParams = {
      ...data,
      token: selectNetwork.shortHand,
    };

    setAmount(data.amount);

    if (data.amount > tradeProps.balance) {
      return toast.error("Oops! You Cant transfer more than your balance");
    }
    sign(extraParams)
      .unwrap()
      .then((res: any) => {
        toast.success(
          "Transaction successfully signed, you will be notified on your transaction status shortly"
        );
        // Transfer signed succesfully modal will be triggered here and the content state wil be updated here too
        handleOpen(TRANSFER_SUCCESSFUL_MODAL);
        setSignedTrxnState(TRXN_SIGN_APPROVED);
        send({
          token: res.payload.token,
        })
          .unwrap()
          .then(() => {
            toast.success("transaction sent successfully");
            // A varialble constant will be made to update here so we could change the content of the modal after a succesfull transaction
            setSignedTrxnState(TRXN_SEND_RESOLVED);
          })
          .catch((err: any) => {
            if (err.status === "FETCH_ERROR") {
              verifyTransactionInterval(signedResponse);
              handleClose();
            } else {
              setSignedTrxnState(TRXN_SEND_REJECTED);
              toast.error("Transaction couldnt be processed at the moment");
            }
          });
      })
      .catch((err: any) => {
        setSignedTrxnState(TRXN_SIGN_REJECTED);
        toast.error("Unable to transfer tokenError");
      });
  };

  const { trade, tradeProps, modalType } = useAppSelector((state) => state.ui);

  const changeSelectedCoin = (newCoin: selectedCoinType) => {
    setSelectedCoin(newCoin);
  };

  const currencyIcons: any = {
    ETH: <Eth />,
    BTC: <Btc />,
    BNB: <Binance />,
    XRP: <Ripple />,
    USDT: <Tether />,
    NGN: <FiatNaira />,
  };

  useEffect(() => {
    if (tradeProps.currencyCode) {
      const passedInNetwok = availableNetwork.filter((coin) => {
        return coin.properShortHand == tradeProps.currencyCode;
      });
      setSelectedCoin(passedInNetwok[0]);
    }
  }, [tradeProps.currencyCode]);

  const code: string = tradeProps.currencyCode;
  return (
    <div className=" px-8 w-full h-full">
      <div
        className={clsx(
          "py-8 px-7 rounded-xl flex items-center space-x-4",
          theme === "light" ? "bg-offwhite" : "bg-neutral-800"
        )}
      >
        <div onClick={() => back()} className="cursor-pointer">
          <ArrowBack />
        </div>
        <div className="text-3xl font-bold capitalize">{trade}</div>
      </div>

      {trade === "Send" && (
        <div className="overflow-hidden h-[450px] mt-10 py-2">
          <div
            className={clsx(
              "flex flex-1 overflow-y-auto flex-col px-8 h-full rounded-xl text-xl ",
              theme === "light" ? "bg-white" : "bg-neutral-800"
            )}
          >
            <div className="text-[27px] font-semibold my-10 ">
              Select Wallet
            </div>

            <div className=" mt-8 grid grid-cols-2">
              <div className="w-full">
                <p className="text-gray-400 text-xs">Coins</p>
                <div
                  onClick={() =>
                    !selectedCoin ? handleOpen(SELECT_COIN_MODAL) : null
                  }
                  className="my-4 w-9/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 "
                >
                  <div>
                    {selectedCoin && Object.keys(selectedCoin).length ? (
                      <div className="flex items-center gap-2">
                        <div>{selectedCoin?.logo}</div>
                        {selectedCoin?.shortHand}
                      </div>
                    ) : (
                      <p>Select Coin</p>
                    )}
                  </div>
                  <div className="aboslute top-2 right-2 ">
                    <CarretDown />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2 w-9/12">
                  <div className="flex items-center space-x-2 ">
                    <SmallNaira />
                    <p className="text-gray-500 text-[12px]">NGN</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallBTC />
                    <p className="text-gray-500 text-[12px]">BTC</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallETH />
                    <p className="text-gray-500 text-[12px]">ETH</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallTether />
                    <p className="text-gray-500 text-[12px]">USDT</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallXRP />
                    <p className="text-gray-500 text-[12px]">XRP</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallBNB />
                    <p className="text-gray-500 text-[12px]">BNB</p>
                  </div>
                </div>

                {/* form to send a coin */}
                {selectedCoin && Object.keys(selectedCoin).length ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={clsx("my-10 w-9/12")}>
                      <label
                        className="text-gray-400 text-xs"
                        htmlFor="receiver_address"
                      >
                        Send to Address
                      </label>
                      <div className={clsx("my-3 border ")}>
                        <input
                          type="text"
                          {...register("receiver_address")}
                          required
                          className={clsx(
                            "w-full py-3  px-1 focus:outline-none placeholder:text-sm",
                            theme === "light"
                              ? "bg-neutral-100"
                              : "bg-neutral-800"
                          )}
                          placeholder="Enter address"
                        />
                      </div>
                    </div>

                    <div className="my-10 w-9/12">
                      <label
                        className="text-gray-400 text-xs"
                        htmlFor="selectNetwork"
                      >
                        Select Network
                      </label>
                      <div
                        onClick={() => handleOpen(SELECT_NETWORK_MODAL)}
                        id="selectNetwork"
                        className="my-4 w-12/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 "
                      >
                        <div>
                          {Object.keys(selectNetwork).length ? (
                            <div className="flex items-center gap-2">
                              <div>{selectNetwork["shortHand"]}</div>
                              {selectNetwork["fullName"]}
                            </div>
                          ) : (
                            <p>Select Network</p>
                          )}
                        </div>
                        <div className="aboslute top-2 right-2 ">
                          <CarretDown />
                        </div>
                      </div>
                    </div>

                    <div className="my-10 w-9/12">
                      <label className="text-gray-400 text-xs" htmlFor="amount">
                        Amount
                      </label>
                      <div className="my-3 border">
                        <input
                          type="text"
                          {...register("amount")}
                          maxLength={100}
                          className={clsx(
                            "w-full py-3  px-1 focus:outline-none placeholder:text-sm",
                            theme === "light"
                              ? "bg-neutral-100"
                              : "bg-neutral-800"
                          )}
                          placeholder="Amount"
                          required
                        />
                      </div>
                      <p className="text-[10px] text-gray-500">
                        $1,000,000.00 daily withdrawal limit remaining.
                      </p>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className={clsx(
                          "text-center w-9/12 text-white rounded-lg px-3 py-2 space-x-3 mb-3  cursor-pointer",
                          status1.isLoading ? "bg-secondary" : "bg-primary"
                        )}
                      >
                        {status1.isLoading ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>
              {/* Avalable Balance box */}
              <div className="text-left px-12">
                <div
                  className={clsx(
                    " shadow rounded-lg w-10/12 ml-auto p-5",
                    theme === "light" ? "bg-gray-200" : "bg-neutral-700"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {currencyIcons[code] ? currencyIcons[code] : <div />}
                    <p className="font-bold text-4xl">
                      {tradeProps.currencyCode}
                    </p>
                    <p className="text-gray-500 text-2xl">
                      {tradeProps.currencyCode} Wallet
                    </p>
                  </div>
                  <div className="my-6">
                    <p className="text-sm text-gray-500">Available balance</p>

                    <div className="text-5xl font-bold my-3">
                      {Number(tradeProps.balance)
                        .toPrecision(7)
                        .toLocaleString() || "0.00"}
                    </div>
                  </div>

                  <div className="my-6 flex space-x-3 items-center">
                    <p className="text-gray-400 text-base">
                      {Number(tradeProps.cryptoBalance).toPrecision(7) ||
                        "0.00"}
                    </p>
                    <p className="bg-gray-400 text-sm shadow text-white rounded p-1">
                      {tradeProps.currencyCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receive component */}
      {trade === "Recieve" && (
        <div className="overflow-hidden h-[450px] mt-10 ">
          <div
            className={clsx(
              "flex flex-1 flex-col  overflow-y-auto px-8 h-full rounded-xl text-xl",
              theme === "light" ? "bg-white" : "bg-neutral-800"
            )}
          >
            <div className="text-[27px] font-semibold my-10 ">
              Select Wallet
            </div>

            <div className=" mt-8 grid grid-cols-2">
              <div className="w-full">
                <p className="text-gray-400 text-xs">Coins</p>
                <div
                  onClick={() =>
                    !selectedCoin ? handleOpen(SELECT_COIN_MODAL) : null
                  }
                  className="my-4 w-9/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 "
                >
                  <div>
                    {selectedCoin && Object.keys(selectedCoin).length ? (
                      <div className="flex items-center gap-2">
                        <div>{selectedCoin?.logo}</div>
                        {selectedCoin?.shortHand}
                      </div>
                    ) : (
                      <p>Select coin</p>
                    )}
                  </div>
                  <div className="aboslute top-2 right-2 ">
                    <CarretDown />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2 w-9/12">
                  <div className="flex items-center space-x-2 ">
                    <SmallNaira />
                    <p className="text-gray-500 text-[12px]">NGN</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallBTC />
                    <p className="text-gray-500 text-[12px]">BTC</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallETH />
                    <p className="text-gray-500 text-[12px]">ETH</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallTether />
                    <p className="text-gray-500 text-[12px]">USDT</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallXRP />
                    <p className="text-gray-500 text-[12px]">XRP</p>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <SmallBNB />
                    <p className="text-gray-500 text-[12px]">BNB</p>
                  </div>
                </div>

                {/* form to send a coin */}

                <form onSubmit={handleSubmit(onSubmit)}>
                  {selectedCoin && Object.keys(selectedCoin).length ? (
                    <div className="my-10 w-9/12">
                      <label
                        className="text-gray-400 text-xs"
                        htmlFor="selectNetwork"
                      >
                        Select Network
                      </label>
                      <div
                        onClick={() => handleOpen(SELECT_NETWORK_MODAL)}
                        id="selectNetwork"
                        className="my-4 w-12/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 "
                      >
                        <div>
                          {Object.keys(selectNetwork).length ? (
                            <div className="flex items-center gap-2">
                              <div>{selectNetwork["properShortHand"]}</div>
                              {selectNetwork["fullName"]}
                            </div>
                          ) : (
                            <p>Select Network</p>
                          )}
                        </div>
                        <div className="aboslute top-2 right-2 ">
                          <CarretDown />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {loading === UNINITIALIZED && null}
                  {loading === INITIALIZED && (
                    <h1>Processing Transaction....</h1>
                  )}
                  {loading === RESOLVED && (
                    <div className="my-10 w-9/12 ">
                      <p className="text-center ">Address</p>
                      <p className="text-center w-9/12 mx-auto text-neutral-500 text-sm">
                        Only send USDT to this address. Sending any other asset
                        to this address may result in the loss of your deposit!
                      </p>

                      <div
                        className={clsx(
                          "border rounded py-1 my-2 items-center justify-between   pl-2 flex gap-x-2 h-10 w-full",
                          theme === "light"
                            ? "bg-neutral-100"
                            : "bg-neutral-800"
                        )}
                      >
                        <input
                          type="text"
                          value={receiverAddress}
                          readOnly
                          className="w-full h-full outline-none bg-transparent leading-tight appearance-none"
                        />
                        <CopyIcon
                          color={
                            theme === "light" ? "#E6E8EC" : "bg-neutral-700"
                          }
                          bgColor={
                            theme === "light" ? "#E6E8EC" : "bg-neutral-800"
                          }
                          onClick={() => {
                            copyAddress(receiverAddress);
                          }}
                        />
                      </div>

                      {/* QR code box  */}
                      <div className="h-[10rem] mx-auto mt-7 p-2 w-[10rem] border-dashed border-2 rounded">
                        <QRCode value={receiverAddress} size={140} />
                      </div>
                    </div>
                  )}

                  {loading === REJECTED && (
                    <h1>Something went wrong please try again</h1>
                  )}
                </form>
              </div>
              {/* Avalable Balance box */}
              <div className="text-left px-12">
                <div
                  className={clsx(
                    "shadow rounded-lg w-10/12 ml-auto p-5",
                    theme === "light" ? "bg-gray-200" : "bg-neutral-700"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {currencyIcons[code] ? currencyIcons[code] : <div />}
                    <p className="font-bold text-4xl">
                      {tradeProps.currencyCode}
                    </p>
                    <p className="text-gray-500 text-2xl">
                      {tradeProps.currencyCode} Wallet
                    </p>
                  </div>
                  <div className="my-6">
                    <p className="text-sm text-gray-500">Available balance</p>

                    <div className="text-5xl font-bold my-3">
                      {Number(availableBalance)
                        .toPrecision(7)
                        .toLocaleString() || "0.00"}
                    </div>
                  </div>

                  <div className="my-6 flex space-x-3 items-center">
                    <p className="text-gray-400 text-base">
                      {Number(tradeProps.cryptoBalance).toPrecision(7) ||
                        "0.00"}
                    </p>
                    <p className="bg-gray-400 text-sm shadow text-white rounded p-1">
                      {tradeProps.currencyCode}
                    </p>
                  </div>
                </div>
                <ul className="w-9/12 list-disc pr-5 ml-auto mt-8 text-[1rem]">
                  <li>
                    Send{" "}
                    <span className="text-orange-600">
                      only {selectedCoin ? selectedCoin?.shortHand : "BTC"}
                    </span>{" "}
                    to this deposit address
                  </li>
                  <li>
                    Ensure the network is
                    <span className="text-orange-600">
                      {selectedCoin ? selectedCoin?.fullName : "BTC"}
                    </span>
                    .
                  </li>
                  <li>
                    Please be sure that the contract address is related to the
                    tokens that you are Receiving.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <AppModal>
        <>
          {modalType === SELECT_COIN_MODAL && (
            <SelectCoin
              changeCoin={(x: selectedCoinType) => {
                handleClose();
                changeSelectedCoin(x);
              }}
              action={handleClose}
              title="Select Coin"
            />
          )}
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
                Ensure the network you choose to deposit matches the withdrawal
                network, or assets may be lost.
              </p>

              <div>
                {availableNetwork.map((network, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSeleectedNetwork(network);
                      handleClose();
                      if (trade === "Recieve") {
                        goReceiveMyCoins();
                      }
                    }}
                    className={clsx(
                      "flex items-center justify-between group rounded-sm p-3 gap-3 w-12/12 cursor-pointer",
                      theme === "light"
                        ? "hover:bg-neutral-100"
                        : "hover:bg-neutral-600"
                    )}
                  >
                    <div className="flex gap-3">
                      <div>{network.logo}</div>
                      <div className="">
                        <p className="text-gray-500">
                          {network.properShortHand}
                        </p>
                        <p className="text-gray-500">{network.fullName}</p>
                      </div>
                    </div>
                    <p className="text-sm">{network.fee}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {modalType === TRANSFER_SUCCESSFUL_MODAL && (
            <div className="w-full">
              <div>
                <p className="text-xl text-center justify-center items-center flex gap-2 font-bold">
                  <span className="">{selectNetwork["logo"]}</span>
                  <span className="">{selectNetwork["fullName"]}</span>
                </p>
              </div>
              {signedTrxnState === TRXN_SIGN_APPROVED && (
                <div className="flex flex-col my-3 text-center justify-center items-center">
                  <p>Your transaction has been signed successfully</p>
                  <p>please check your recent transaction to confirm status</p>
                  <div className="my-2">
                    <Loader
                      type="Audio"
                      color="#683a9e"
                      height={40}
                      width={60}
                    />
                  </div>
                </div>
              )}
              {signedTrxnState === TRXN_SIGN_REJECTED && (
                <p>Opps, something went wrong somewhere</p>
              )}
              {signedTrxnState === TRXN_SEND_RESOLVED && (
                <div>
                  <p className="flex justify-center items-center">
                    <SuccessBadge />
                  </p>
                  <p className="text-2xl mb-2 text-center font-smeibold">
                    Transfer successful!
                  </p>

                  <p className="text-sm justify-center text-center my-2 items-center flex gap-1 font-smeibold">
                    <SmallETH />
                    <span>{amount} Eth have been transfered successfully!</span>
                  </p>
                </div>
              )}
              {signedTrxnState === TRXN_SEND_REJECTED && (
                <div className="my-3 text-center">
                  Something went wrong please try again
                </div>
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
        </>
      </AppModal>
      <Toaster />
    </div>
  );
};

export default Send;
