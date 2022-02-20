import React, { FC } from "react";
import Withdraw from "../../assets/svg/Withdraw";

interface Props {
  type: string;

  amount: string;
  date: string;
  coin: string;
}
const WithdrawCard: FC<Props> = ({ type, amount, date, coin }) => {
  return (
    <div className="flex justify-between my-7 px-8">
      <div className="flex space-x-3">
        <Withdraw />
        <div className="space-y-3">
          <div className="">
            <p className=" font-semibold text-[16px] capitalize ">
              {type} {coin}
            </p>
            <p className="text-green-500">Completed</p>
          </div>

          <p className="text-neutral-800 font-semibold text-[14px]">
            {amount} {coin}
          </p>
        </div>
      </div>
      <div className="text-gray-400">{new Date(date).toDateString()}</div>
    </div>
  );
};

export default WithdrawCard;
