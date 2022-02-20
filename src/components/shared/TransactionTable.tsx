import React, { FC } from "react";
import EmptyState from "../../assets/svg/EmptyState";
import Selector from "../../assets/svg/Selector";
import { tableHeader } from "../../data";

interface Props {
  showHeader?: boolean;
}

const TransactionTable: FC<Props> = ({ showHeader }) => {
  return (
    <div className="w-full bg-white flex-1 flex flex-col h-auto rounded-xl  shadow-sm py-9 px-4">
      {showHeader && (
        <div>
          <p className="text-2xl font-bold">Wallet History</p>
        </div>
      )}

      {/* table */}

      <div className="mt-4 w-full">
        <div className="py-4 grid grid-cols-12 ">
          {tableHeader.map((item, index) => {
            return (
              <p
                className={
                  item.title === "Transcation ID"
                    ? "col-span-4 flex items-center text-gray-500 text-sm py-2"
                    : "col-span-2 flex items-center text-gray-500 text-sm py-2"
                }
                key={index}
              >
                {item.title}
                <span className="mx-2 cursor-pointer">
                  <Selector />
                </span>
              </p>
            );
          })}
        </div>
        <div className="h-px bg-slate-300 w-full"></div>
      </div>

      <div className="flex justify-center flex-1 h-auto my-16 flex-col items-center w-full ">
        <EmptyState width="212" height="201" />
        <p className="my-4">No Transaction History</p>
      </div>
    </div>
  );
};

export default TransactionTable;
