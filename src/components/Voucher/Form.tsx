import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Image from "next/image";
import btc from "../../../public/assets/btc.png";
import mastercard from "../../../public/assets/XMLID_328_.png";
import Visa from "../../../public/assets/visa.png";
import googlepay from "../../../public/assets/googlePay.png";

interface Props {}

const Form = (props: Props) => {
  const [voucher, setVoucher] = useState([
    "$20",
    "$50",
    "$100",
    "$200",
    "$500",
  ]);

  const [current, setCurrent] = useState(voucher[0]);

  const choose = (item: string) => {
    setCurrent(item);
  };
  return (
    <div className="w-full px-8 py-10 bg-white shadow-2xl lg:w-11/12 xl:w-9/12 lg:px-4 xl:px-14 rounded-2xl">
      <h3 className="w-full text-2xl font-semibold md:text-center lg:text-left md:text-4xl lg:w-8/12 text-secondary">
        Buy Omega Voucher
      </h3>

      <div className="mt-8">
        <div>
          <label className="block mb-2 text-sm font-semibold text-links">
            Voucher value
          </label>
          <input
            className="w-full px-3 py-2 border-2 rounded-lg border-omgray2 "
            type="text"
            placeholder={current}
          />
          <div className="grid grid-cols-5 gap-2 mt-4 md:gap-6">
            {voucher.map((item, index) => (
              <p
                onClick={() => choose(item)}
                className={` ${
                  current === item ? "bg-white border" : "bg-gray"
                }  flex items-center cursor-pointer border-blue-500 font-medium justify-center p-2 rounded-md  text-secondary`}
                key={index}
              >
                {item}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <label className="block mb-2 text-sm font-semibold text-links">
              Worth
            </label>
            <div className="flex items-center justify-between px-4 py-3 border-2 rounded-md text-links border-omgray2">
              <p>0.111447624</p>

              <div className="flex">
                <div className="flex ">
                  <Image src={btc} alt="btc" /> <p className="mx-1">BTC</p>
                </div>

                <BiChevronDown className="text-2xl text-links" />
              </div>
            </div>
          </div>

          <div className="mt-10 ">
            <button className="w-full px-3 py-4 text-white rounded-lg shadow-2xl bg-primary">
              Buy now
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-links">Payment Methods we accept</p>
            <div className="flex items-center justify-center">
              <div className="mx-2.5 mt-2">
                <Image src={mastercard} alt="master card" />
              </div>
              <div className="mx-2.5">
                <Image src={Visa} alt="visa" />
              </div>
              <div className="mx-2.5">
                {" "}
                <Image src={googlepay} alt="google pay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
