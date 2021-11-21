import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  img: any;
}

const VoucherCard = ({ title, description, img }: Props): JSX.Element => {
  return (
    <div className="flex flex-wrap">
      <div className="flex items-center justify-center w-full lg:w-2/12">
        <Image src={img} alt={title} />
      </div>
      <div className="mt-2 lg:mt-0 lg:w-7/12 xl:w-5/12">
        <h4 className="text-center text-gray2 lg:text-left"> {title}</h4>
        <p className="text-xs text-center lg:text-lg text-links lg:text-left">
          {description}
        </p>
      </div>
    </div>
  );
};

export default VoucherCard;
