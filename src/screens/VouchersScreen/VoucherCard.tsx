import React, { FC, useState } from "react";
import Deposit from "../../assets/svg/Deposit";
import Send from "../../assets/svg/Send";
import VoucherLogo from "../../assets/svg/VoucherLogo";
import { useAppDispatch } from "../../hooks/useStoreHooks";
import { showModal } from "../../reducers/ui";
import { usePurchaseVoucherMutation } from "../../services/vouchers";

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
}

const VoucherCard: FC<Props> = ({ value, icon, amount, setDetails }) => {
  const [voucher] = usePurchaseVoucherMutation();

  const dispatch = useAppDispatch();

  const purchaseVoucher = async () => {
    try {
      const response = await voucher({
        amountInNaira: amount,
        amountInDollars: 20,
        rate: 500,
      }).unwrap();
      if (response) {
        dispatch(showModal({ showModal: true }));
        setDetails({ ...response.payload });
        console.log(response.payload, ">>>>>>><<<<<<<");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex flex-col justify-between w-full px-4 py-3 bg-white shadow-sm cursor-pointer rounded-xl">
      <div className="flex justify-between w-full mb-4">
        <div className="flex flex-col justify-center">
          <VoucherLogo />
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
