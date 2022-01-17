import React, { FC } from "react";

import VoucherCard from "./VoucherCard";
import RectangleSvg from "../../assets/svg/RectangleSvg";
import OvalSvg from "../../assets/svg/OvalSvg";
import PlusAdd from "../../assets/svg/PlusAdd";
import VoucherLogo from "../../assets/svg/VoucherLogo";

const VouchersScreen: FC = () => {
  const data = [
    {
      id: 1,
      value: "1K",
      icon: <OvalSvg />,
    },
    {
      id: 2,
      value: "2K",
      icon: <RectangleSvg />,
    },
    {
      id: 3,
      value: "3K",
      icon: <OvalSvg />,
    },
    {
      id: 4,
      value: "4K",
      icon: <RectangleSvg />,
    },
    {
      id: 5,
      value: "4K",
      icon: <OvalSvg />,
    },
  ];
  return (
    <div className="flex flex-1 flex-col px-6">
      {/* heading */}
      <div className="bg-white py-4 px-5 rounded-2xl text-4xl font-bold">
        Available Vouchers
      </div>

      {/* list of vouchers */}

      <div className="my-5 grid grid-cols-3 gap-5 ">
        {data.map((item) => (
          <VoucherCard key={item.id} {...item} />
        ))}
        <div className=" bg-gray-700 w-full flex-col shadow-sm flex justify-center items-center rounded-xl py-3 px-4 cursor-pointer relative">
          <div className="flex absolute text-white top-4 left-3 flex-col justify-center">
            <VoucherLogo />
            <div className="text-xs text-center text-white">Voucher</div>
          </div>
          <div className="cursor-pointer">
            <PlusAdd />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VouchersScreen;
