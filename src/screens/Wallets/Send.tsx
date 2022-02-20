import React, { useState } from "react";
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

const Send = () => {
  const { back } = useRouter();

  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(showModal({ showModal: true }));
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  const { trade, tradeProps } = useAppSelector((state) => state.ui);

  const currencyIcons: any = {
    ETH: <Eth />,
    BTC: <Btc />,
    BNB: <Binance />,
    XRP: <Ripple />,
    USDT: <Tether />,
    NGN: <FiatNaira />,
  };

  const code: string = tradeProps.currencyCode;
  return (
    <div className=" px-8 w-full h-full">
      <div className="bg-white py-8 px-7 rounded-xl flex items-center space-x-4">
        <div onClick={() => back()}>
          <ArrowBack />
        </div>
        <div className="text-3xl font-bold capitalize">{trade}</div>
      </div>

      <div className="flex flex-1 flex-col px-8 h-full rounded-xl bg-white text-xl mt-10 ">
        <div className="text-[27px] font-semibold my-10 ">Select Wallet</div>

        <div className=" mt-8 grid grid-cols-2">
          <div className="w-full">
            <p className="text-gray-400 text-xs">Coins</p>
            <div
              onClick={() => handleOpen()}
              className="my-4 w-9/12 text-gray-400 justify-between cursor-pointer flex items-center relative px-2 border h-12 "
            >
              <p>Select coin</p>
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

            <div className="my-10 w-9/12">
              <label className="text-gray-400 text-xs" htmlFor="address">
                Send to Address
              </label>
              <div className="my-3 border ">
                <input
                  type="text"
                  name="adresss"
                  id=""
                  className="w-full py-3 px-1 focus:outline-none placeholder:text-sm"
                  placeholder="Enter address"
                />
              </div>
            </div>

            <div className="my-10 w-9/12">
              <label className="text-gray-400 text-xs" htmlFor="address">
                Select Network
              </label>
              <div className="my-3 border ">
                <input
                  type="text"
                  name="adresss"
                  id=""
                  className="w-full py-3 px-1 focus:outline-none placeholder:text-sm"
                  placeholder="Select Network"
                />
              </div>
            </div>

            <div className="my-10 w-9/12">
              <label className="text-gray-400 text-xs" htmlFor="address">
                Amount
              </label>
              <div className="my-3 border  ">
                <input
                  type="text"
                  name="adresss"
                  id=""
                  className="w-full py-3 px-1 focus:outline-none placeholder:text-sm"
                  placeholder="Amount"
                />
              </div>
              <p className="text-[10px] text-gray-500">
                $1,000,000.00 daily withdrawal limit remaining.
              </p>
            </div>
          </div>
          <div className="text-left px-12">
            <div className="bg-gray-200 shadow rounded-lg w-10/12 ml-auto p-5">
              <div className="flex items-center space-x-3">
                {currencyIcons[code] ? currencyIcons[code] : <div />}
                <p className="font-bold text-4xl">{tradeProps.currencyCode}</p>
                <p className="text-gray-500 text-2xl">
                  {tradeProps.currencyCode} Wallet
                </p>
              </div>
              <div className="my-6">
                <p className="text-sm text-gray-500">Available balance</p>

                <div className="text-5xl font-bold my-3">
                  {Number(tradeProps.balance).toPrecision(7).toLocaleString() ||
                    "0.00"}
                </div>
              </div>

              <div className="my-6 flex space-x-3 items-center">
                <p className="text-gray-400 text-base">
                  {Number(tradeProps.cryptoBalance).toPrecision(7) || "0.00"}
                </p>
                <p className="bg-gray-400 text-sm shadow text-white rounded p-1">
                  {tradeProps.currencyCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppModal>
        <SelectCoin action={handleClose} title="Select Coin" />
      </AppModal>
    </div>
  );
};

export default Send;
