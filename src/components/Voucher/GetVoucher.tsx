import React from "react";
import Container from "../shared/Container";

import { voucherList } from "../../data";
import VoucherCard from "./VoucherCard";
import Form from "./Form";

interface Props {}

const GetVoucher = (props: Props) => {
  return (
    <div className="px-2 py-10 md:px-16 lg:py-40 bg-secondary">
      <Container>
        <div className="flex flex-col flex-wrap lg:flex-row">
          <div className="w-full mt-8 lg:w-6/12">
            <h2 className="font-sans text-3xl font-bold text-center text-white md:text-5xl md:pl-8 lg:text-left">
              Omega Voucher
            </h2>
            <p className="lg:w-10/12 text-center lg:text-left xl:w-7/12 md:pl-8 mt-4 leading-6 text-xs md:text-[16px] text-links tracking-wider">
              Purchase Omega Voucher instantly and convert to a cryptocurrency
              of your choice and get it straight to your Dolaway wallet.
            </p>

            {/* details */}

            <div className="grid grid-cols-3 gap-3 mt-6 lg:grid-cols-1 lg:mt-10 xl:mt-20 lg:gap-7">
              {voucherList.map((voucher, index) => (
                <VoucherCard
                  key={index}
                  title={voucher.heading}
                  description={voucher.text}
                  img={voucher.icon}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center w-full mt-10 lg:justify-end lg:mt-0 lg:w-6/12">
            <Form />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GetVoucher;
