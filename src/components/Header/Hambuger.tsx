import React, { FC } from "react";
import clsx from "clsx";

interface Props {
  open?: boolean;
  setOpen?: any;
}

const Hambuger: FC<Props> = ({ open, setOpen }) => {
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div className="relative mx-auto sm:max-w-xl">
      <nav x-data="{open: flase}">
        <button
          className="relative w-10 h-10 text-gray-500 bg-offwhite focus:outline-none"
          onClick={() => toggle()}
        >
          <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <span
              aria-hidden="true"
              className={clsx(
                { "rotate-45  ": open },
                "block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out  "
              )}
            ></span>
            <span
              aria-hidden="true"
              className={clsx(
                { "opacity-0": open },
                "block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out"
              )}
            ></span>
            <span
              aria-hidden="true"
              className={clsx(
                { "-rotate-45 ": open },
                "block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out"
              )}
            ></span>

            <span
              aria-hidden="true"
              className={clsx(
                { "opacity-0 ": open },
                "block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out -translate-y-1.5"
              )}
            ></span>

            <span
              aria-hidden="true"
              className={clsx(
                { "opacity-0 ": open },
                "block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out translate-y-1.5"
              )}
            ></span>
          </div>
        </button>
      </nav>
    </div>
  );
};

export default Hambuger;
