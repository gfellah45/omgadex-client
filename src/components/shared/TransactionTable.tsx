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
import Pagination from "./Pagination";
import { isEmpty } from "lodash";

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
  totalPages?: number;
}

const TransactionTable: FC<Props> = ({ showHeader, tableData, totalPages }) => {
  const { theme } = useTheme();

  const data = useMemo(() => (tableData ? tableData : []), [tableData]);
  const columns = useMemo(() => Transaction, []);

  const { rows, getTableBodyProps, headerGroups, getTableProps, prepareRow } = useTable({
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
        <table {...getTableProps} className="min-w-full text-sm divide-y divide-gray-200">
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} className="bg-gray-50 py-4 " {...restHeaderProps}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={`${column.id}-${column.accessor}`}
                      {...restHeaderProps}
                      className="px-4 py-4 font-bold text-left text-gray-600"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              );
            })}
          </thead>

          <tbody {...getTableBodyProps()} className="divide-y divide-gray-100">
            {isEmpty(rows) && (
              <tr>
                <td colSpan={6} className="p-4 ">
                  <div className="flex flex-col mt-10 justify-center items-center ">
                    <EmptyState height="200" width="200" />
                    <p className="font-bold text-lg my-6">No Data</p>
                  </div>
                </td>
              </tr>
            )}
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
                      <td key={key} {...restCellProps} className="px-4 py-2 text-center truncate">
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

      <div className="my-3 flex justify-center md:justify-end py-6">
        {totalPages && totalPages > 0 ? <Pagination totalPages={totalPages} /> : ""}
      </div>
    </div>
  );
};

export default TransactionTable;
