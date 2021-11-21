import React from "react";

interface Props {
  currency?: string;
  amount?: string;
  subAmount?: string;
  exchange?: string;
  percentage?: string;
}

const CurrencyCard = ({
  currency,
  amount,
  subAmount,
  exchange,
  percentage,
}: Props): JSX.Element => {
  return (
    <div className="container px-2 py-4 mx-auto cursor-pointer lg:px-8 hover:bg-white hover:rounded-2xl hover:shadow-2xl">
      {/* currency */}
      <div className="text-xs text-links lg:text-sm">
        {currency}/{exchange}
        <span
          className={`px-2 py-1 text-xs lg:text-sm mx-2  text-white ${
            percentage?.includes("-") ? "bg-badge2" : "bg-badge1"
          }  rounded-2xl`}
        >
          {percentage}
        </span>
      </div>

      {/* amoount */}

      <div className="my-2 text-2xl font-semibold">{amount}</div>

      {/* sub amount */}

      <div className="text-sm text-links">{subAmount}</div>
    </div>
  );
};

export default CurrencyCard;
