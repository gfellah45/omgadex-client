import clsx from "clsx";
import { useTheme } from "next-themes";
import React from "react";

const Subscribe = (): JSX.Element => {
  const { theme } = useTheme();
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center mt-10 text-center px-6 py-14 md:py-36 ",
        theme === "light" ? "bg-omgray" : " bg-secondary "
      )}
    >
      <div className="text-4xl text-left md:text-center font-bold md:text-4xl">
        Subsribe to Our News Letter
      </div>
      <p className="mt-10 lg:w-5/12 text-left md:text-center text-links md:w-8/12">
        Dont miss out on the latest happenings in the crypto space stay up to date on the relevant
        trends and happenings in
      </p>

      <div className="flex items-center justify-center w-12/12 rounded-xl  mt-12 shadow-2xl md:w-7/12">
        <input
          type="text"
          className="w-7/12 px-4 py-4 md:py-6 rounded-xl rounded-tr-none rounded-br-none focus:outline-none"
          placeholder="Enter your email"
        />
        <button className="w-5/12 px-8 py-4 text-white md:py-6 rounded-tr-xl rounded-br-xl bg-primary">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
