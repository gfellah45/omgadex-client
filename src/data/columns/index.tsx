// @ts-nocheck
import clsx from "clsx";
import { isEmpty } from "lodash";
export const Transaction = [
  {
    Header: "Type",
    accessor: "type",
    Cell: ({ row }) => {
      console.log(row);
      const type = isEmpty(row.original.coin) ? "Deposit" : "Transfer";
      return (
        <div
          className={clsx(
            " text-center px-2 py-1 mx-2 rounded-md",
            type === "Deposit"
              ? "bg-purple-500 text-white"
              : "bg-green-500 text-white"
          )}
        >
          {type}
        </div>
      );
    },
  },
  {
    Header: "Coin",
    accessor: "coin",
    Cell: ({ cell: { value } }) => {
      const type = isEmpty(value) ? "Fiat" : value;
      return <div className="flex items-center uppercase">{type}</div>;
    },
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ cell: { value } }) => {
      return (
        <div className="flex items-center">{Number(value).toFixed(2)}</div>
      );
    },
  },
  {
    Header: "Address",
    accessor: "fromAddress",
    minWidth: 60,
    maxWidth: 100,
    width: 50,
    Cell: ({ cell: { value } }) => {
      return <div className="flex items-center">{value}</div>;
    },
  },
  {
    Header: "Transaction ID",
    accessor: "transactionId",
    minWidth: 60,
    maxWidth: 100,
    width: 50,
    Cell: ({ cell: { value } }) => {
      return <div className="flex items-center">{value}</div>;
    },
  },
  {
    Header: "Date",
    accessor: "date",
    Cell: ({ cell: { value } }) => {
      return <div className="flex items-center">{value}</div>;
    },
  },
];
