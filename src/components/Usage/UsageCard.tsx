import React from "react";
import Image from "next/image";

interface Props {
  image: string;
  text: string;
  description: string;
}

const UsageCard = ({ image, text, description }: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center my-5 text-center md:mt-0">
      <div>
        <Image src={image} alt={text} />
      </div>
      <h2 className="mt-6 text-2xl font-semibold">{text}</h2>
      <p className="w-7/12 mt-6 text-center text-links">{description}</p>
    </div>
  );
};

export default UsageCard;
