import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  img: any;
}

const VoucherCard = ({ title, description, img }: Props): JSX.Element => {
  return (
    <div className="flex flex-wrap items-center my-6 md:my-0 gap-3">
      <div className="flex items-center justify-center w-2/12">
        <Image src={img} alt={title} />
      </div>
      <div className="mt-2 lg:mt-0 w-7/12 lg:w-7/12 xl:w-5/12">
        <h4 className="text-omgray2 text-left"> {title}</h4>
        <p className="text-xs  lg:text-lg text-links text-left">{description}</p>
      </div>
    </div>
  );
};

export default VoucherCard;
