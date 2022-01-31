import React, { FC } from "react";
import Close from "../../assets/svg/Close";
import Eth from "../../assets/svg/Eth";

interface Props {
  action: () => void;
  title: string;
}

const AvailableCoins = (): JSX.Element => {
  return (
    <>
      <div className="flex items-center">
        <div>
          <Eth />
        </div>
        <div>
          <p className="text-gray-500">ETH</p>
          <p className="text-gray-500">Entherum</p>
        </div>
      </div>
    </>
  );
};

const SelectCoin = ({ action, title }: Props) => {
  return (
    <div className="w-full">
      <div>
        <p className="text-2xl font-bold">{title}</p>
      </div>
      <div
        onClick={action}
        className=" absolute right-0 top-6 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100 "
      >
        <Close />
      </div>
      <div>texting</div>
      {/* <AvailableCoins /> */}
    </div>
  );
};

export default SelectCoin;
