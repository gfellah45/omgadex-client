import React, { FC } from "react";
import Deposit from "../../assets/svg/Deposit";

import Send from "../../assets/svg/Send";
import VoucherLogo from "../../assets/svg/VoucherLogo";

interface Props {
  value?: string;
  icon?: any;
}

const VoucherCard: FC<Props> = ({ value, icon }) => {
  return (
    <div className="bg-white w-full flex-col shadow-sm flex justify-between rounded-xl py-3 px-4 cursor-pointer relative">
      <div className="flex w-full justify-between mb-4">
        <div className="flex flex-col justify-center">
          <VoucherLogo />
          <div className="text-xs text-center text-gray-500">Voucher</div>
        </div>
        <div className="">
          <div className="text-xs  text-gray-500 mt-4">Value</div>
          <div className="text-[32px] font-bold leading-8">
            &#x20A6; {value}
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="flex items-center space-x-2 cursor-pointer my-2">
          <div>
            <Send />
          </div>
          <div>Gift</div>
        </div>
        <div className=" text-primary flex items-center space-x-2 cursor-pointer ">
          <div>
            <Deposit />
          </div>
          <div>Buy</div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0">{icon}</div>
    </div>
  );
};

export default VoucherCard;
