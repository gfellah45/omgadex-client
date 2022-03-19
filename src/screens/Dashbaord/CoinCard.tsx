import clsx from "clsx";
import { useTheme } from "next-themes";
import React, { FC } from "react";
import Path from "../../assets/svg/Path";

interface Props {
  name: string;
  value: string;
  icon: React.ReactElement;
  chart: React.ReactElement;
  percentage: string | number;
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
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        " rounded-lg relative py-10 shadow-sm px-5 flex items-center",
        theme === "light" ? "bg-white" : "bg-neutral-800 shadow-md"
      )}
    >
      {/* crypto logo */}
      <div>{icon}</div>
      <div className="ml-4 space-y-2 ">
        <p className="text-[20px] font-semibold">{name}</p>
        <p className="text-gray-500">{initials}</p>
        <p className="text-[16px] font-semibold">{value.slice(0, 7)} USD</p>
      </div>

      <div
        className={` ${
          percentage < 0 ? "text-red-500 rotate-90" : "text-green-500"
        }  ml-auto`}
      >
        {chart}
      </div>

      <div
        className={`absolute right-5 top-3 ${
          percentage < 0 ? "text-red-500" : "text-green-600"
        }  space-x-2 flex items-center`}
      >
        <div
          className={`${
            percentage < 0 ? "text-red-500 rotate-180" : "text-green-500"
          }`}
        >
          <Path />
        </div>

        <p>{percentage}</p>
      </div>
    </div>
  );
};

export default CoinCard;
