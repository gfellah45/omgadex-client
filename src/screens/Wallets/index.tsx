import React, { useEffect, useState } from "react";
import Btc from "../../assets/svg/Btc";
import CarretDown from "../../assets/svg/CarretDown";
import Deposit from "../../assets/svg/Deposit";
import Eth from "../../assets/svg/Eth";
import Eye from "../../assets/svg/Eye";
import FiatNaira from "../../assets/svg/FiatNaira";
import Ripple from "../../assets/svg/Ripple";
import Send from "../../assets/svg/Send";
import Tether from "../../assets/svg/Tether";
import { TransactionButtons } from "../../components/shared/Buttons";
import CryptoWallets from "./CryptoWallets";
import FiatCard from "./FiatCard";
import FundWallet from "./FundWallet";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { hideModal, showModal } from "../../reducers/ui";
import AppModal from "../../modals";
import {
  useGetFiatWalletQuery,
  useGetWalletQuery,
} from "../../services/wallet";
import { useRedeemVoucherMutation } from "../../services/vouchers";
import toast, { Toaster } from "react-hot-toast";

const Wallets = () => {
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { address } = useAppSelector((state) => state.auth.user);

  const { push } = useRouter();

  const { data: ETH } = useGetWalletQuery({ address, symbol: "ETH" });
  const { data: USDT } = useGetWalletQuery({ address, symbol: "USDT" });
  const { data: BTC } = useGetWalletQuery({ address, symbol: "BTC" });
  const { data: XRP } = useGetWalletQuery({ address, symbol: "XRP" });

  const { walletInfo, currentCryptoPrices } = useAppSelector(
    (state) => state.dashboard.user.payload
  );

  const { data: fiat, isSuccess } = useGetFiatWalletQuery();

  const [redeem, { isLoading, isError, data, isSuccess: isSuccessR, error }] =
    useRedeemVoucherMutation();

  isSuccessR &&
    toast.success(
      "Voucher redeemed successfully, Fiat wallet credited successfully",
      {
        id: "voucher-redeemed",
      }
    );
  function closeModal() {
    dispatch(hideModal());
  }

  function openModal() {
    dispatch(showModal({ showModal: true }));
  }

  const toggleState = () => {
    setShow((prevState) => !prevState);
    localStorage.setItem("show_wallets", JSON.stringify(show));
  };

  const navigateToSingleWallet = () => {
    push(`/wallets/${5}`);
  };

  const navigateToSend = () => {
    push(`wallets/send/${5}`);
  };

  useEffect(() => {
    const storage = localStorage.getItem("show_wallets") || false;

    const boolValue = storage === "true";
    setShow(boolValue);
  }, []);
  return (
    <div className="flex flex-col flex-1 px-8 pb-12">
      <div>
        <div className="flex flex-wrap px-10 py-12 bg-white rounded-lg shadow-sm">
          <div className="w-6/12 space-y-7">
            <p className="text-3xl font-bold">Wallet Overview</p>
            <div>
              <p className="text-lg text-neutral-500">Total Balance</p>
              <p className="text-4xl font-bold">
                {show ? walletInfo.balance : "*********"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 ">
                {show ? walletInfo.equivalentBTC.toPrecision(7) : "*********"}
                <span className="p-2 mx-3 text-white bg-green-500 rounded-lg">
                  BTC
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between w-6/12">
            <div className="flex justify-end ml-auto space-x-2 ">
              <p
                onClick={() => toggleState()}
                className="flex px-2 py-2 space-x-3 border-2 rounded-lg cursor-pointer text-neutral-500"
              >
                <span>Show Balance</span> <Eye />
              </p>
              <p className="flex items-center px-4 py-1 space-x-2 bg-gray-300 cursor-pointer rounded-2xl text-neutral-800">
                <span>NGN</span> <CarretDown />
              </p>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <TransactionButtons
                text="Send"
                action={navigateToSend}
                icon={<Send />}
              />
              <TransactionButtons text="Recieve" icon={<Deposit />} />
              <TransactionButtons
                text="Trade"
                icon={<Send />}
                action={navigateToSingleWallet}
              />
              <TransactionButtons
                text="Fund"
                icon={<Deposit />}
                primary={true}
                action={openModal}
              />
            </div>
            <AppModal>
              <FundWallet
                redeem={redeem}
                isLoading={isLoading}
                isError={isError}
                action={closeModal}
                isSuccess={isSuccessR}
                error={error}
              />
            </AppModal>
          </div>
        </div>
      </div>

      <div className="w-7/12 mt-10 ">
        <p className="text-3xl font-bold">Fiat Wallets</p>

        <div className="mt-4">
          <FiatCard
            icon={<FiatNaira />}
            currency="Naira"
            currencyCode="NGN"
            balance={isSuccess && fiat.payload.amountInNaira}
            show={show}
            action={openModal}
          />
        </div>
      </div>

      <div className="mt-10 ">
        <p className="text-3xl font-bold">Crypto Wallets</p>

        <div className="grid grid-cols-2 gap-10 mt-4">
          <CryptoWallets
            icon={<Tether />}
            currency="USD Tether"
            currencyCode="USDT"
            cryptoBalance={0}
            balance={
              USDT ? Number(USDT.payload.amount).toPrecision(7) : "0.0000"
            }
            dollarBalance={0}
            show={show}
          />
          <CryptoWallets
            icon={<Eth />}
            currency="Ethereum"
            currencyCode="ETH"
            cryptoBalance={Number(currentCryptoPrices.ETH.price).toPrecision(7)}
            balance={ETH ? Number(ETH.payload.amount).toPrecision(7) : "0.0000"}
            dollarBalance={
              ETH
                ? Number(ETH.payload.dollar_equivalent).toPrecision(7)
                : "0.0000"
            }
            show={show}
          />
          <CryptoWallets
            icon={<Btc />}
            currency="Bitcoin"
            currencyCode="BTC"
            cryptoBalance={0}
            balance={0}
            dollarBalance={0}
            show={show}
          />
          <CryptoWallets
            icon={<Ripple />}
            currency="Ripple"
            currencyCode="XRP"
            cryptoBalance={Number(currentCryptoPrices.ETH.price).toPrecision(7)}
            balance={XRP ? Number(XRP.payload.amount).toPrecision(7) : "0.0000"}
            dollarBalance={
              XRP
                ? Number(XRP.payload.dollar_equivalent).toPrecision(7)
                : "0.0000"
            }
            show={show}
          />
        </div>
      </div>

      <Toaster
        toastOptions={{
          position: "top-right",
          duration: 7000,
          id: "voucher-redeemed",
        }}
      />
    </div>
  );
};

export default Wallets;
