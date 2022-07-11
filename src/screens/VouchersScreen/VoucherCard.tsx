import React, { FC } from 'react';
import Deposit from '../../assets/svg/Deposit';
import Send from '../../assets/svg/Send';
import VoucherLogo from '../../assets/svg/VoucherLogo';
import { useAppDispatch } from '../../hooks/useStoreHooks';
import { showModal } from '../../reducers/ui';
import { usePurchaseVoucherMutation } from '../../services/vouchers';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

type IPaymentDetails = {
  amountInDollars: number;
  amountInNaira: number;
  rate: number;
  txnRef: string;
};

interface Props {
  value?: string;
  icon?: any;
  amount: number;
  setDetails: (details: IPaymentDetails) => void;
  details: IPaymentDetails;
}

const VoucherCard: FC<Props> = ({
  value,
  icon,
  amount,
  setDetails,
  details,
}) => {
  const [voucher] = usePurchaseVoucherMutation();

  const dispatch = useAppDispatch();

  const purchaseVoucher = async () => {
    try {
      const response = await voucher({
        amountInNaira: amount,
        amountInDollars: amount / details.rate,
        rate: details.rate,
      }).unwrap();
      if (response) {
        dispatch(showModal({ showModal: true, modalType: 'initial' }));

        setDetails({ ...response.payload });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        'relative flex flex-col justify-between w-full px-4 py-3  shadow-sm cursor-pointer rounded-xl',
        theme === 'light' ? 'bg-white' : 'bg-neutral-800',
      )}
    >
      <div className="flex justify-between w-full mb-4">
        <div className="flex flex-col space-y-1 justify-center">
          <div className="flex space-x-1">
            <VoucherLogo /> <div>Lajeni</div>
          </div>

          <div className="text-xs text-center text-gray-500">Voucher</div>
        </div>
        <div className="">
          <div className="mt-4 text-xs text-gray-500">Value</div>
          <div className="text-[32px] font-bold leading-8">
            &#x20A6; {value}
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="flex items-center my-2 space-x-2 cursor-pointer">
          <div>
            <Send />
          </div>
          <div>Gift</div>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer text-primary">
          <div>
            <Deposit />
          </div>
          <div onClick={() => purchaseVoucher()}>Buy</div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0">{icon}</div>
    </div>
  );
};

export default VoucherCard;
