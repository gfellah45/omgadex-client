/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useCallback } from 'react';
import ArrowBack from '../../assets/svg/ArrowBack';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import CarretDown from '../../assets/svg/CarretDown';
import { availableNetwork, availableNetworkProps } from './Send';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { hideModal, showModal } from '../../reducers/ui';
import Close from '../../assets/svg/Close';
import AppModal from '../../modals';
import {
  useBuyOrSellCryptoMutation,
  useConvertRateToCryptoMutation,
  useVerifyTransactionMutation,
  useCompleteBuyOrSellMutation,
} from '../../services/sendCrypto';
import toast, { Toaster } from 'react-hot-toast';
import SuccessBadge from '../../assets/svg/SuccessBadge';
import SmallBTC from '../../assets/svg/SmallBTC';
import SmallETH from '../../assets/svg/SmallETH';
import BackAndForthArrow from '../../../public/assets/backAndForthArrow.png';
import Loader from 'react-loader-spinner';
import { CurrencyFormatter } from '../../lib/currencyFormatter';
import Image from 'next/image';

const BUYING_PENDING = 'BUYING_PENDING';
const BUYING_IN_PROGRESS = 'BUYING_IN_PROGRESS';
const BUYING_RESOLVED = 'BUYING_RESOLVED';
const BUYING_REJECTED = 'BUYING_REJECTED';

// Types of modal on this component are:
const SELECT_NETWORK_MODAL = 'SELECT_NETWORK_MODAL';
const CRYPTO_STATUS_MODAL = 'CRYPTO_STATUS_MODAL';

// Transaction Status
const TRX_IN_PROGRESS = 'TRX_IN_PROGRESS';
const TRX_RESOLVED = 'TRX_RESOLVED';

// minimum purchaseable amount required for a transaction
const minimumPurchaseableAmount = 700;
const maximumPurchaseableAmount = 1550;

function Buy() {
  const { theme } = useTheme();
  const { back, push } = useRouter();
  const [selectNetwork, setSeleectedNetwork] = useState<
    availableNetworkProps | any
  >({});
  const [buyCrptoStatus, setBuyCrptoStatus] = useState(BUYING_PENDING);
  const modalType = useAppSelector((state) => state.ui.modalType);
  const [amount, setAmount] = useState('1000');
  const [convertedRate, setConvertedRate] = useState('');
  const [verifyTrxStatus, setVerifyTrxStatus] = useState(TRX_IN_PROGRESS);
  const [signedResponse, setSignedResponse] = useState({});

  const [buyOrSellCrypto, { isLoading }] = useBuyOrSellCryptoMutation();
  const [convertRate, { isLoading: loadingConvertedAmount }] =
    useConvertRateToCryptoMutation();
  const [verifyTransaction, { isLoading: loadingVerifyTransaction }] =
    useVerifyTransactionMutation();
  const [completeBuyOrSell, { isLoading: loadingCompleteBuyOrSell }] =
    useCompleteBuyOrSellMutation();

  const { dollarBalance } = useAppSelector(
    (state) => state.dashboard.user.payload.walletInfo,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(hideModal());
  };
  const handleOpen: (modalType?: string | undefined) => void = (modalType) => {
    dispatch(showModal({ showModal: true, modalType: modalType }));
  };

  // verify transaction function
  const verifyTransactionInterval = async (passedInRes: any) => {
    toast.success(
      'transaction is taking to long. you will be notified when its completed',
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
          .then((res) => {
            console.log(
              res,
              'this is the response messaged after verification',
            );
            if (res?.message.includes('successful')) {
              console.log(
                res.message,
                'successfull is included to your response',
              );
              toast.success('Transaction is successful');
            } else {
              toast.success(res?.message);
            }
          })
          .catch((err) => {
            console.log(err, 'error trying to verify your transaction');
          });
      }, 10000);
    }
  };

  const debounce = function (func: any) {
    let timer: any | NodeJS.Timeout;
    return function (...args: any[] | void | any) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, 500);
    };
  };

  interface convertedAmountResponse {
    message: string;
    payload: {
      btc: number;
      eth: number;
      bnb: number;
      xrp: number;
    };
  }

  const handleOnChange = async function (e: any, args: any) {
    setAmount(e.target.value);
    convertRate({
      currency: 'dollar',
      convertedTo: 'crypto',
      payload: { amount: e.target.value },
    })
      .unwrap()
      .then(({ payload }: any) => {
        console.log(payload, 'the converted rate');
        setConvertedRate(payload.eth);
      })
      .catch((err) => {
        toast.error("Sorry we couldn't convert your amount at the moment");
        console.log(err, 'error while converting the amount ');
      });
  };

  const optimizedFn = useCallback(debounce(handleOnChange), []);

  // On submit function
  const onSubmit = (data: any) => {
    data['ethAmount'] = convertedRate.toString();
    for (let value in data) {
      if (!data[value].length) {
        return toast.error('You cant submit an empty form fields');
      }
      if (value === 'amount') {
        data[value] = parseFloat(data[value]);
        if (data[value] > dollarBalance) {
          return toast.error(
            'You cant buy more than the worth of your balance',
          );
        }
        if (
          data[value] <= minimumPurchaseableAmount ||
          data[value] >= maximumPurchaseableAmount
        ) {
          return toast.error(
            'You cant buy less than ' +
              minimumPurchaseableAmount +
              ' or more than ' +
              maximumPurchaseableAmount,
            ' worth of selected coin',
          );
        }
      }
    }
    handleOpen(CRYPTO_STATUS_MODAL);
    setBuyCrptoStatus(BUYING_IN_PROGRESS);
    buyOrSellCrypto({
      ethAmount: data.ethAmount,
      amount: data.amount.toString(),
      type: 'buy',
    })
      .unwrap()
      .then((res: any) => {
        toast.success('Transaction Signed successfully');
        setSignedResponse(res);
        completeBuyOrSell({ token: res.payload.encoded })
          .unwrap()
          .then((res: any) => {
            handleOpen(CRYPTO_STATUS_MODAL);
            setBuyCrptoStatus(BUYING_RESOLVED);
            console.log(res, 'youve successfully completed buy or sell');
          })
          .catch((err) => {
            if (err.status === 'FETCH_ERROR') {
              verifyTransactionInterval(signedResponse);
              handleClose();
            } else {
              handleClose();
              console.log(err, 'Trade gone wrong, try again');
            }
          });
      })
      .catch((err) => {
        if (err.status === 'FETCH_ERROR') {
          toast.success(
            'transaction is taking to long. you will be notified when its completed',
          );
          handleClose();
        } else {
          toast.error('Trade gone wrong, try again');
          handleOpen(CRYPTO_STATUS_MODAL);
          setBuyCrptoStatus(BUYING_REJECTED);
          console.log(err, 'there was an error while trying to buy crypto');
        }
      });
  };

  return (
    <>
      <div className=" px-8 w-full h-full">
        <div
          className={clsx(
            'bg-white py-8 px-7 rounded-xl flex items-center space-x-4',
            theme === 'light' ? 'bg-offwhite' : 'bg-neutral-800',
          )}
        >
          <div onClick={() => back()} className="cursor-pointer">
            <ArrowBack />
          </div>
          <div className="text-3xl font-bold capitalize">
            Buy {selectNetwork.shortHand}
          </div>
        </div>

        <div className="overflow-hidden h-[450px] mt-10 ">
          <div
            className={clsx(
              'flex flex-1 overflow-y-auto flex-col px-8 h-full rounded-xl text-xl ',
              theme === 'light' ? 'bg-white' : 'bg-neutral-800',
            )}
          >
            <div className="text-[19px] my-8">Select wallet to pay with</div>
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
                <div className="flex justify-between items-start gap-x-5 my-5 min-h-20 w-10/12">
                  <div className="w-5/12">
                    <label
                      htmlFor="amount"
                      className="font-light text-neutral-400  text-[1rem]"
                    >
                      Amount to pay
                    </label>
                    <div
                      className={`mt-2 w-full text-gray-400 rounded justify-between cursor-pointer flex items-center relative px-2 border h-12 ${
                        errors['amount'] ? 'border-red-600' : ''
                      }`}
                    >
                      <input
                        type="text"
                        className="w-10/12 h-full bg-white outline-none border-0"
                        placeholder="1000"
                        {...register('amount', { required: true })}
                        name="amount"
                        id="amount"
                        onChange={(e) => optimizedFn(e)}
                      />
                      <p>$</p>
                    </div>
                    <p className="text-xs text-neutral-500 my-1">
                      Available Balance:{' '}
                      <b> {CurrencyFormatter('USD').format(dollarBalance)}</b>
                    </p>
                  </div>
                  <div className="h-28 items-center justify-center flex ">
                    <Image src={BackAndForthArrow} alt="arror" />
                  </div>
                  <div className="w-5/12">
                    <label
                      htmlFor="ethAmount"
                      className="font-light text-neutral-400 text-[1rem]"
                    >
                      Recieve
                    </label>
                    <div
                      className={`mt-2 w-full text-gray-400 rounded justify-between border cursor-pointer flex items-center relative px-2  h-12 `}
                    >
                      <input
                        type="text"
                        className="w-10/12 h-full pr-1 bg-transparent outline-none border-0"
                        placeholder="0.1"
                        {...register('ethAmount')}
                        name="ethAmount"
                        id="ethAmount"
                        disabled
                        // defaultValue={convertedRate}
                        value={
                          loadingConvertedAmount
                            ? 'Converting Amount...'
                            : convertedRate
                        }
                      />
                      <p>{selectNetwork ? selectNetwork.shortHand : 'ETH'}</p>
                    </div>
                    {/* <p className="text-xs text-neutral-500 my-1">
                      0.90 USD at<b> N580/USD</b>
                    </p> */}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className={clsx(
                      'text-center w-6/12 text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer',
                      isLoading || loadingConvertedAmount
                        ? 'bg-secondary'
                        : 'bg-primary',
                    )}
                    disabled={loadingConvertedAmount}
                  >
                    {isLoading || loadingConvertedAmount ? 'Loading...' : 'Buy'}
                    {/* Buy */}
                  </button>
                </div>
              </form>
              <div className="md:w-[40%]">
                <div
                  className={clsx(
                    ' shadow rounded-lg w-10/12 ml-auto p-5',
                    theme === 'light' ? 'bg-gray-200' : 'bg-neutral-700',
                  )}
                >
                  <div className="flex items-start flex-col">
                    <p className="font-bold text-sm">You are Paying</p>
                    <p className="flex justify-start gap-x-2 items-center">
                      <span className="text-gray-500 font-bold text-2xl">
                        {CurrencyFormatter('USD').format(amount)}
                      </span>
                    </p>
                  </div>
                  <div className="mt-6 mb-3">
                    <p className="font-bold text-sm text-gray-500">
                      You will receive
                    </p>
                    <div className="text-2xl font-bold my-3">
                      <p>
                        {loadingConvertedAmount
                          ? 'loading...'
                          : convertedRate || 1}{' '}
                        <span>{selectNetwork.fullName || 'ETH'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3 items-center">
                    {/* <p className="text-gray-400 text-base">
                      0.90 USD at N580/USD
                    </p> */}
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
                'absolute right-0 top-6 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100',
                theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-600',
              )}
            >
              <Close />
            </div>

            <p className="text-sm my-2 font-smeibold">
              Ensure the network you choose to deposit matches the withdrawal
              network, or assets may be lost.
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
                    'flex items-center justify-between group rounded-sm p-3 gap-3 w-12/12 cursor-pointer',
                    theme === 'light'
                      ? 'hover:bg-neutral-100'
                      : 'hover:bg-neutral-600',
                  )}
                >
                  <div className="flex gap-3">
                    <div>{network.logo}</div>
                    <div className="">
                      <p className="text-gray-500">{network.properShortHand}</p>
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
                <p>Transaction Signed successfully please</p>
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
                <p className="text-2xl mb-2 text-center font-smeibold">
                  Transfer successful!
                </p>

                <p className="text-sm w-10/12 mx-auto font-smeibold">
                  <span className="justify-center text-center my-2 items-start flex">
                    <SmallETH />
                    {amount} Eth worth has been transfered to your wallet
                    successfully!
                  </span>
                </p>
              </div>
            )}
            {buyCrptoStatus === BUYING_REJECTED && (
              <div className="my-3 text-center">
                Something went wrong please try again
              </div>
            )}

            <div className="mx-auto my-3 flex justify-center items-center">
              <button
                onClick={() => {
                  handleClose();
                  push('/wallets');
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

export default Buy;
