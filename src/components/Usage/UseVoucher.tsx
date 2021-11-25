import React from "react";
import Container from "../shared/Container";

import { usage } from "../../data";
import UsageCard from "./UsageCard";
interface Props {}

const UseVoucher = (props: Props) => {
  return (
    <div className="mt-20 lg:my-32">
      <Container>
        <div>
          <h2 className="font-sans text-4xl font-bold text-center md:text-5xl ">
            More Ways to get Omega voucher
          </h2>
          <p className="mt-5 text-center text-links">
            Buy easily & securely from an official and authorized distributors.
          </p>
        </div>

        <div className="grid grid-cols-1 mt-10 md:mt-20 md:grid-cols-3">
          {usage.map((item, index) => (
            <UsageCard
              key={index}
              text={item.heading}
              image={item.icon}
              description={item.text}
            />
          ))}
        </div>

        <div className="mt-20 md:mt-32">
          <h2 className="text-2xl font-bold text-center md:text-4xl">
            What are you waiting for?
          </h2>
          <p className="mt-5 text-center text-links">
            Get our voucher and easily convert to cryptocurrencies
          </p>
          <div className="mx-auto mt-10 text-center ">
            <button className="w-7/12 px-3 py-2 text-white md:px-5 md:py-6 lg:w-2/12 md:4/12 rounded-2xl bg-primary">
              Create Account
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UseVoucher;
