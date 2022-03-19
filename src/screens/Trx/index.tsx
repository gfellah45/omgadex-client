import clsx from "clsx";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import ArrowDown from "../../assets/svg/ArrowDown";
import Calendar from "../../assets/svg/Calendar";
import Search from "../../assets/svg/Search";
import TransactionTable from "../../components/shared/TransactionTable";

const Trx = () => {
  const transationTypes = [
    {
      id: 1,
      name: "All type",
    },
    {
      id: 2,
      name: "Withdrawals",
    },
    {
      id: 3,
      name: "Deposits",
    },

    {
      id: 4,
      name: "Deposits",
    },
    {
      id: 5,
      name: "Transfers",
    },
  ];

  const { theme } = useTheme();

  const [selectedType, setSelectedType] = useState(transationTypes[0].id);
  return (
    <div
      className={clsx(
        "flex flex-1 h-full mx-4 flex-col px-6 rounded-2xl shadow-sm",
        theme === "light" ? "bg-white" : " bg-neutral-800"
      )}
    >
      <div className="flex flex-wrap border-b w-full py-8  items-center justify-between ">
        <div className="w-6/12">
          <ul className="flex justify-between">
            {transationTypes.map(({ name, id }) => (
              <li
                onClick={() => setSelectedType(id)}
                key={id}
                className={` rounded-2xl hover:bg-neutral-600 hover:text-white cursor-pointer ${
                  selectedType === id
                    ? "bg-neutral-600 text-white "
                    : " text-neutral-500"
                } py-1 px-3 text-sm font-bold `}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-6 flex-wrap">
          <div className="relative w-7/12 ring-neutral-300 ring-1 rounded-lg ">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className=" w-full rounded-lg  focus:outline-none px-4 py-1 "
            ></input>
            <div className="absolute top-2 right-4">
              <Search />
            </div>
          </div>

          <div className="ring-neutral-300 flex space-x-1 items-center justify-between  ring-1 w-3/12 py-2 px-2 rounded-2xl">
            <div className="text-xs font-bold">All Time</div>
            <div className="cursor-pointer">
              <Calendar />
            </div>
          </div>
        </div>
      </div>

      <div className="flex  justify-between w-full items-center py-8">
        <div className="font-bold text-lg">Transactions</div>
        <div className="bg-primary rounded-2xl px-3 space-x-3 py-1 cursor-pointer flex items-center justify-between ">
          <div>
            <ArrowDown />
          </div>
          <div className="text-white">Export</div>
        </div>
      </div>

      <div className="-mt-8">
        <TransactionTable />
      </div>
    </div>
  );
};

export default Trx;
