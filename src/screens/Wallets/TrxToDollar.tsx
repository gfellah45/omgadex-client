// @ts-nocheck
import React, { FC } from 'react';
import Close from '../../assets/svg/Close';
import { useAppDispatch } from '../../hooks/useStoreHooks';
import { hideModal } from '../../reducers/ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGetRateQuery } from '../../services/vouchers';
import toast from 'react-hot-toast';
import { CurrencyFormatter } from '../../lib/currencyFormatter';
import { useTransferToDollarWalletMutation } from '../../services/wallet';
import Loader from 'react-loader-spinner';

const TrxToDollar: FC = () => {
  const dispatch = useAppDispatch();

  const { handleSubmit, register, watch, reset } = useForm();

  const { data } = useGetRateQuery();
  const amount = watch('amount');

  const rate = Number(data?.payload.nairaEquivalence);

  const [transfer, { isLoading }] = useTransferToDollarWalletMutation();

  const onFinish: SubmitHandler<{ amount: number }> = async (data) => {
    try {
      const res = await transfer(data.amount).unwrap();
      toast.success(
        `${res.message.dollarBalance.toFixed(
          2,
        )} has been transferred to your Dollar wallet`,
      );
      dispatch(hideModal());
      reset();
    } catch (e) {
      toast.error('Something went wrong, please try again');
    }
  };

  return (
    <div className="w-full ">
      <div
        onClick={() => {
          dispatch(hideModal());
        }}
        className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-6"
      >
        <Close />
      </div>

      <div className="mt-16 text-center w-8/12 mx-auto font-semibold">
        Transfer funds from your Naira wallet to Dollar wallet
      </div>

      <form className="my-4" onSubmit={handleSubmit(onFinish)}>
        <div>
          <label className="text-gray-600 my-2">Amount</label>
          <input
            {...register('amount', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            type="number"
            placeholder="Enter Amount"
          />
        </div>
        <p className="mt-2 text-neutral-700">
          You are getting {CurrencyFormatter('USD').format(amount / rate)} at
          the rate of {rate}/dollar
        </p>

        <div className="text-right my-6">
          <button className="bg-primary hover:opacity-75 text-white px-6 rounded-lg py-2">
            {isLoading ? (
              <p className="flex items-center justify-center w-full">
                <Loader type="ThreeDots" color="#fff" height={30} width={60} />
              </p>
            ) : (
              ' Transfer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrxToDollar;
