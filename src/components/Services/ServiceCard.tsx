import React from "react";

interface Props {
  title?: string;
  description?: string;
}

const ServiceCard = ({ title, description }: Props): JSX.Element => {
  return (
    <div className="flex flex-wrap px-0 py-8 md:px-2">
      <div className="flex items-center justify-center w-2/12">
        <p className="w-3 h-3 rounded-full md:w-6 md:h-6 bg-gray2"></p>
      </div>
      <div className="w-8/12">
        <h3 className="text-sm lg:text-lg xl:text-2xl text-secondary">
          {title}
        </h3>
        <p className="text-xs text-links lg:text-sm xl:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
