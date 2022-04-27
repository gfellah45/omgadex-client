// @ts-nocheck
// @ts-nochecks
import clsx from "clsx";
import { useTheme } from "next-themes";
import React, { FC, useMemo } from "react";
import EmptyState from "../../assets/svg/EmptyState";
import Selector from "../../assets/svg/Selector";
import { tableHeader } from "../../data";
import { useTable } from "react-table";
import { Transaction } from "../../data/columns";

interface Props {
  showHeader?: boolean;
  tableData?: {
    amount: string;
    coin: string;
    date: string;
    fromAddress: string;
    toAddress: string;
    transactionId: string;
  }[];
}

const TransactionTable: FC<Props> = ({ showHeader, tableData }) => {
  const { theme } = useTheme();

  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => Transaction, []);

  const { rows, getTableBodyProps, headerGroups, getTableProps, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div
      className={clsx(
        "w-full  flex-1 flex flex-col h-auto rounded-xl  shadow-sm py-9 px-4",
        theme === "light" ? "bg-white" : "bg-neutral-800"
      )}
    >
      {showHeader && (
        <div>
          <p className="text-2xl font-bold">Wallet History</p>
        </div>
      )}

      {/* table */}

      <div className="overflow-hidden overflow-x-auto border border-gray-100 rounded">
        <table
          {...getTableProps}
          className="min-w-full text-sm divide-y divide-gray-200"
        >
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} className="bg-gray-50" {...restHeaderProps}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={`${column.id}-${column.accessor}`}
                      {...restHeaderProps}
                      className="px-4 py-2 font-medium text-left text-gray-600"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>

          <tbody {...getTableBodyProps()} className="divide-y divide-gray-100">
            {rows.map((row) => {
              prepareRow(row);
              const { key, ...restProps } = row.getRowProps();
              return (
                <tr key={key} {...restProps}>
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps({
                      style: {
                        maxWidth: cell.column.maxWidth,
                      },
                    });
                    return (
                      <td
                        key={key}
                        {...restCellProps}
                        className="px-4 py-2 text-center truncate"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 
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
      </div> */}

      {/* <div className="flex justify-center flex-1 h-auto my-16 flex-col items-center w-full ">
        <EmptyState width="212" height="201" />
        <p className="my-4">No Transaction History</p>
      </div> */}
    </div>
  );
};

export default TransactionTable;
