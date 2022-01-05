import React, { FC } from "react";
import Close from "../../assets/svg/Close";
import Link from "next/link";

interface Props {
  action?: () => void;
}

const FundWallet: FC<Props> = ({ action }) => {
  return (
    <div className="w-full">
      <div>
        <p className="text-2xl font-bold">Redeem Omega Voucher</p>
      </div>
      <div
        onClick={action}
        className=" absolute right-0 top-6 pl-6 cursor-pointer pr-3 py-3 flex justify-center items-center rounded-l-lg bg-gray-100 "
      >
        <Close />
      </div>

      <div className="mt-10">
        <form className="flex flex-wrap  items-center justify-between">
          <div className="w-7/12">
            <label className="text-gray-500 block my-2 text-xs">
              Voucher Code
            </label>
            <input
              className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
              type="text"
              placeholder="9H4R3-F98F4-34U34-4398Y"
            />
          </div>
          <div className="ml-4 mt-8 flex flex-1 justify-center items-center">
            <button className="w-full bg-primary hover:opacity-75 text-white px-4 py-2 rounded-lg">
              Redeem Code
            </button>
          </div>
        </form>

        <div className="bg-red-100 py-2 px-6 text-xs text-red-600 rounded-lg my-6 flex justify-between">
          <p>Invalid Voucher Code, try again! </p>
          <p>
            <a href="#">Contact Support</a>
          </p>
        </div>

        <div className="flex justify-center item-center mt-2 ">
          <p className="text-gray-500 text-xs">
            Don’t have a voucher?{" "}
            <span>
              <Link href="/vouchers">
                <a className="text-blue-600">Get new vouchers here</a>
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
