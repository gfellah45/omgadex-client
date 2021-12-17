import React, { FC } from "react";
import Withdraw from "../../assets/svg/Withdraw";

interface Props {
  method: string;
  status: string;
  amount: string;
  date: string;
}
const WithdrawCard: FC<Props> = ({ method, status, amount, date }) => {
  return (
    <div className="flex justify-between my-7 px-8">
      <div className="flex space-x-3">
        <Withdraw />
        <div className="space-y-3">
          <div className="">
            <p className=" font-semibold text-[16px] ">{method}</p>
            <p className="text-green-500">{status}</p>
          </div>

          <p className="text-neutral-800 font-semibold text-[14px]">{amount}</p>
        </div>
      </div>
      <div className="text-gray-400">{date}</div>
    </div>
  );
};

export default WithdrawCard;
