import React, { FC, useState } from 'react';
import Inputs from '../../components/shared/Inputs';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useGetRecentRateQuery,
  usePurchaseVoucherMutation,
  useVerifyPaymentQuery,
} from '../../services/vouchers';
import { isEmpty } from 'lodash';
import { PaystackButton } from 'react-paystack';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { hideModal } from '../../reducers/ui';
import { formatCurrency } from '../../utils';

type IDetails = {
  amountInDollars: number;
  amountInNaira: number;
  rate: number;
  txnRef: string;
};

type IFormData = {
  amount: number;
};

const CustomVoucher: FC = () => {
  const [screen, setScreen] = useState('first');

  const [details, setDetails] = useState<IDetails>({
    amountInDollars: 0,
    amountInNaira: 0,
    rate: 0,
    txnRef: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const [voucher, { isLoading }] = usePurchaseVoucherMutation();
  const { data: rate } = useGetRecentRateQuery();

  const handleClick: SubmitHandler<IFormData> = async (data) => {
    try {
      const response = await voucher({
        amountInNaira: data.amount,
        amountInDollars: data.amount / Number(rate?.payload.nairaEquivalence),
        rate: Number(rate?.payload.nairaEquivalence) || 0,
      }).unwrap();
      if (!isEmpty(response)) {
        setDetails({ ...response.payload });
        setScreen('second');
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(details, 'lets see');
  const dispatch = useAppDispatch();

  const { auth } = useAppSelector((state) => state);
  const email = auth.user.email;

  const [ref, setRef] = useState('');

  const { refetch, isSuccess: confirmSuccess } = useVerifyPaymentQuery(ref, {
    skip: !ref,
  });
  const handlePaystackSuccessAction = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference) {
      setRef(reference.trxref);
      refetch();
      dispatch(hideModal());
    }
  };

  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const config = {
    publicKey: 'pk_test_8a379d8bc67e6c9e77c337fa852de6c641d81063',
    email,
    amount: details.amountInNaira * 100,
    reference: details.txnRef,
  };

  const componentProps = {
    ...config,
    text: 'Confirm',
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };
  return (
    <div>
      {screen === 'first' && (
        <>
          <h3 className="text-2xl font-bold">Purchase Voucher Card</h3>

          <form onSubmit={handleSubmit(handleClick)} className="my-5">
            <Inputs
              errors={errors}
              register={register}
              name="amount"
              type="number"
              label="Enter Amount"
              placeholder="Enter Amount in Naira"
              minLength={0}
              validation={{ required: 'This is required' }}
            />

            <div className=" my-6 flex justify-end">
              <button className="bg-primary px-6 py-2 rounded-md text-white">
                {isLoading ? 'Processing...' : 'Procced'}
              </button>
            </div>
          </form>
        </>
      )}

      {screen === 'second' && (
        <>
          <div className="space-y-4">
            <h4 className=" text-center font-semibold text-lg">
              You Are about to purchase Voucher with the following details
            </h4>
            <div className="bg-gray-200 rounded-lg space-y-3 px-4 py-6">
              <p className="text-lg">
                Amount in Naira:{' '}
                <span className="font-bold">
                  {formatCurrency(details.amountInNaira, 'NGN')}
                </span>
              </p>
              <p className="text-lg">
                Equivalent in Dollars{' '}
                <span className="font-bold">
                  {formatCurrency(details.amountInDollars, 'USD')}
                </span>
              </p>
              <p className="text-lg">
                Rate: <span className="font-bold">{details.rate}</span>
              </p>
            </div>
            <div>
              <PaystackButton
                className="px-4 py-2 text-white bg-green-500 rounded-lg w-full"
                {...componentProps}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomVoucher;
