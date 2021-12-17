import React, { FC } from "react";
import Path from "../../assets/svg/Path";

interface Props {
  name: string;
  value: string;
  icon: React.ReactElement;
  chart: React.ReactElement;
  percentage: string;
  initials: string;
}

const CoinCard: FC<Props> = ({
  name,
  value,
  icon,
  chart,
  percentage,
  initials,
}) => {
  return (
    <div className="bg-white rounded-lg relative py-10 shadow-sm px-5 flex items-center">
      {/* crypto logo */}
      <div>{icon}</div>
      <div className="ml-4 space-y-2 ">
        <p className="text-[20px] font-semibold">{name}</p>
        <p className="text-gray-500">{initials}</p>
        <p className="text-[16px] font-semibold">{value}</p>
      </div>

      <div className="ml-auto">{chart}</div>

      <div className=" absolute right-5 top-3 text-green-600 space-x-2 flex items-center">
        <Path />
        <p>{percentage}</p>
      </div>
    </div>
  );
};

export default CoinCard;
