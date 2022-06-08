// @ts-nocheck
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import Image from 'next/image';
import btc from '../../../public/assets/btc.png';
import mastercard from '../../../public/assets/XMLID_328_.png';
import Visa from '../../../public/assets/visa.png';
import googlepay from '../../../public/assets/googlePay.png';
import { useAppDispatch } from '../../hooks/useStoreHooks';
import { hideModal, showModal } from '../../reducers/ui';
import AppModal from '../../modals';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PaystackButton } from 'react-paystack';
import {
  useGetRateQuery,
  usePurchaseVoucherNonLoggedInMutation,
  useVerifyPaymentQuery,
} from '../../services/vouchers';
import { isEmpty } from 'lodash';
import { formatCurrency } from '../../utils';

interface Props {}

const Form = (props: Props) => {
  const [voucher, setVoucher] = useState([
    '$20',
    '$50',
    '$100',
    '$200',
    '$500',
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [purchased, { isLoading }] = usePurchaseVoucherNonLoggedInMutation();

  const [current, setCurrent] = useState(voucher[0]);
  const [voucherResponse, setVoucherResponse] = useState<{
    email: string;
    amountInNaira: number;
    txnRef: string;
    rate: number;
    amountInDollars: number;
    view: boolean;
  }>({
    email: '',
    amountInNaira: 0,
    txnRef: '',
    rate: 0,
    amountInDollars: 0,
    view: false,
  });

  const [ref, setRef] = useState('');

  // rate hook

  const { data: rate } = useGetRateQuery();

  // set amount in naira
  const amountInNaira =
    Number(rate?.payload.nairaEquivalence) * parseInt(current.replace('$', ''));

  const dispatch = useAppDispatch();

  // trigger modal
  const triggerModal = () => {
    dispatch(showModal({ showModal: true, modalType: 'buy vouucher' }));
  };

  const choose = (item: string) => {
    setCurrent(item);
  };

  // paystack key

  const config = {
    publicKey: 'pk_test_8a379d8bc67e6c9e77c337fa852de6c641d81063',
    email: voucherResponse.email,
    amount: voucherResponse.amountInNaira * 100,
    reference: voucherResponse.txnRef,
  };

  const { refetch, isSuccess: confirmSuccess } = useVerifyPaymentQuery(ref);

  const handlePaystackSuccessAction = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference) {
      setRef(reference.trxref);
      refetch();
      dispatch(hideModal());
    }
  };

  const componentProps = {
    ...config,
    text: 'Confirm',
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: () => {
      console.log('closed');
    },
  };

  const onFinish: SubmitHandler<{ email: string }> = async (data) => {
    const resp = await purchased({
      amountInDollars: parseInt(current.replace('$', '')),
      amountInNaira,
      email: data.email,
      rate: Number(rate?.payload.nairaEquivalence),
    }).unwrap();
    if (resp) {
      setVoucherResponse({
        email: resp.payload.email,
        amountInNaira: resp.payload.amountInNaira,
        txnRef: resp.payload.txnRef,
        rate: resp.payload.rate,
        amountInDollars: resp.payload.amountInDollars,
        view: true,
      });
    }
  };

  return (
    <div className="w-full px-8 py-10 bg-white shadow-2xl lg:w-11/12 xl:w-9/12 lg:px-4 xl:px-14 rounded-2xl">
      <h3 className="w-full text-2xl font-semibold md:text-center lg:text-left md:text-4xl lg:w-8/12 text-secondary">
        Buy Omega Voucher
      </h3>

      <AppModal>
        {voucherResponse.view && (
          <div className="w-92">
            <div className="my-8 text-2xl font-bold text-center">
              Transaction Destails
            </div>

            <div className="space-y-3">
              <div className="text-xl">
                Amount in dollars:{' '}
                <span className="font-semibold text-secondary">
                  {formatCurrency(
                    voucherResponse ? voucherResponse.amountInDollars : 0,
                    'USD',
                  )}
                </span>
              </div>
              <div className="text-xl">
                Amount in naira:{' '}
                <span className="font-semibold text-secondary">
                  {formatCurrency(
                    voucherResponse ? voucherResponse.amountInNaira : 0,
                    'NGN',
                  )}
                </span>
              </div>
              <div className="text-xl">
                Transaction Rate:{' '}
                <span className="font-semibold text-secondary">
                  {voucherResponse.rate}
                </span>
              </div>
              <div className="text-xl">
                Transaction Reference:{' '}
                <span className="font-semibold text-secondary">
                  {voucherResponse.txnRef}
                </span>
              </div>
              <div className="text-xl">
                Email:{' '}
                <span className="font-semibold text-secondary">
                  {voucherResponse.email}
                </span>
              </div>
            </div>

            <div className="my-4 text-gray-500">
              Please copy the transaction reference and keep it somewhere save
              till the voucher is redeemed.
            </div>

            <div>
              <PaystackButton
                className="w-full p-2 my-3 text-white bg-green-500 rounded-md hover:opacity-75"
                {...componentProps}
              />
              {/* <button className="w-full p-2 my-3 text-white bg-green-500 rounded-md hover:opacity-75">
                Confirm
              </button> */}
            </div>
          </div>
        )}
        {!voucherResponse.view && (
          <div>
            <div className="my-3 text-3xl font-semibold">Hello!</div>
            <p className="my-2 text-base text-gray-500">
              Your are about to purchase a Voucher with the following details{' '}
            </p>

            <div className="flex flex-col w-full p-3 my-4 space-y-3 bg-gray-100 rounded shadow">
              <div className="text-lg">
                Amount in Dollar: <span className="font-bold">{current}</span>
              </div>
              <div className="text-lg">
                Equivalent in Naira:{' '}
                <span className="font-bold">
                  {amountInNaira.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'NGN',
                  })}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onFinish)}>
              <label htmlFor="email" className="text-gray-500">
                Please enter your email address below to procces
              </label>

              <input
                {...register('email', { required: 'This is required' })}
                type="email"
                id="email"
                className="w-full p-1 my-3 border-2"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <div className="my-4 text-gray-500">
                <p>
                  {' '}
                  Please ensure you crosscheck and input your correct email
                  address before proceeding
                </p>
                <p>
                  We will not be held accuntable for any loss or damage caused
                  by mistakes in email address
                </p>
              </div>

              <div className="flex items-center space-x-10">
                <button
                  onClick={() => {
                    dispatch(hideModal());
                  }}
                  className="w-full p-2 my-3 text-white bg-red-500 rounded-md hover:opacity-75"
                >
                  Cancel
                </button>
                <button className="w-full p-2 my-3 text-white bg-green-500 rounded-md hover:opacity-75">
                  Procced
                </button>
              </div>
            </form>
          </div>
        )}
      </AppModal>

      <div className="mt-8">
        <div>
          <label className="block mb-2 text-sm font-semibold text-links">
            Voucher value
          </label>
          <input
            className="w-full px-3 py-2 border-2 rounded-lg border-omgray2 "
            type="text"
            placeholder={current}
            value={current}
            onChange={(e) => {
              setCurrent(e.target.value);
            }}
          />
          <div className="grid grid-cols-5 gap-2 mt-4 md:gap-6">
            {voucher.map((item, index) => (
              <p
                onClick={() => choose(item)}
                className={` ${
                  current === item ? 'bg-white border' : 'bg-gray'
                }  flex items-center cursor-pointer border-blue-500 font-medium justify-center p-2 rounded-md  text-secondary`}
                key={index}
              >
                {item}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <label className="block mb-2 text-sm font-semibold text-links">
              Worth
            </label>
            <div className="flex items-center justify-between px-4 py-3 border-2 rounded-md text-links border-omgray2">
              <p>0.111447624</p>

              <div className="flex">
                <div className="flex ">
                  <Image src={btc} alt="btc" /> <p className="mx-1">BTC</p>
                </div>

                <BiChevronDown className="text-2xl text-links" />
              </div>
            </div>
          </div>

          <div className="mt-10 ">
            <button
              onClick={() => triggerModal()}
              className="w-full px-3 py-4 text-white rounded-lg shadow-2xl bg-primary"
            >
              Buy now
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-links">Payment Methods we accept</p>
            <div className="flex items-center justify-center">
              <div className="mx-2.5 mt-2">
                <Image src={mastercard} alt="master card" />
              </div>
              <div className="mx-2.5">
                <Image src={Visa} alt="visa" />
              </div>
              <div className="mx-2.5">
                {' '}
                <Image src={googlepay} alt="google pay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
