import clsx from "clsx";
import { useTheme } from "next-themes";
import React from "react";

interface Props {
  title?: string;
  description?: string;
}

const ServiceCard = ({ title, description }: Props): JSX.Element => {
  const { theme } = useTheme();
  return (
    <div className="flex border-b md:border-b-0 flex-wrap px-0 py-8 md:px-2">
      <div className="flex pt-1 md:pt-0 items-start md:items-center justify-center w-2/12">
        <p className="w-4 h-4 rounded-full md:w-6 md:h-6 bg-omgray2"></p>
      </div>
      <div className="w-8/12">
        <h3
          className={clsx(
            "text-sm lg:text-lg xl:text-2xl",
            theme === "light" ? "text-neutral-600" : "text-omgray2"
          )}
        >
          {title}
        </h3>
        <p className="text-md text-links lg:text-sm xl:text-lg">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
