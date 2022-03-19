import React, { useState, FC } from "react";
import Close from "../../../assets/svg/Close";
import Eye from "../../../assets/svg/Eye";
import TrashCan from "../../../assets/svg/TrashCan";
import AppModal from "../../../modals";
import { hideModal, showModal } from "../../../reducers/ui";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStoreHooks";
import clsx from "clsx";
import { useTheme } from "next-themes";
// Types of modals in this component
const ADD_BANK_DETAILS_MODAL = "ADD_BANK_DETAILS_MODAL";
const DELETE_ACCOUNT_MODAL = "DELETE_ACCOUNT_MODAL";

interface bankDetails {
  name: string;
  accountNumber: string;
  id: number;
}

// Dummy available accounts
const accounts: bankDetails[] = [
  { name: "Access Bank", accountNumber: "00********3", id: 1 },
  { name: "Stanbic", accountNumber: "00********3", id: 2 },
  { name: "First Bank Nigeria", accountNumber: "00********3", id: 3 },
];

const BankDetails: FC = () => {
  const [theAccounts, setAccunts] = useState(accounts);
  const [selectedId, setSelectedId] = useState(0);
  const dispatch = useAppDispatch();

  const { modalType } = useAppSelector((state) => state.ui);

  const deleteAccount = () => {
    setAccunts((prev) => prev.filter((acount) => acount.id !== selectedId));
  };

  const { theme } = useTheme();
  return (
    <>
      <div className="w-full min-h-[60vh]">
        {theAccounts.map(({ name, accountNumber, id }) => {
          return (
            <div
              key={id}
              className="flex  items-center justify-between w-full py-6 mb-3 border-b"
            >
              <div className="flex flex-col items-start">
                <p className="font-semibold">{name}</p>
                <span className="text-neutral-500">{accountNumber}</span>
              </div>
              <div>
                <button
                  onClick={() => {
                    dispatch(
                      showModal({
                        showModal: true,
                        modalType: DELETE_ACCOUNT_MODAL,
                      })
                    );
                    setSelectedId(id);
                  }}
                  className="bg-red-500 text-white rounded-full px-6 py-2 space-x-3  cursor-pointer flex items-center justify-between "
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex items-center h-full flex-col justify-center">
          {!accounts.length && (
            <div className="w-3/12 mx-auto h-auto flex flex-col justify-center items-center ">
              <h3>Bank Details</h3>
              <p className="text-center">
                You do not have any bank account added
              </p>
            </div>
          )}
          <button
            onClick={() =>
              dispatch(
                showModal({
                  showModal: true,
                  modalType: ADD_BANK_DETAILS_MODAL,
                })
              )
            }
            className="bg-primary w-max text-center  text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
          >
            Add Bank Account
          </button>
        </div>
      </div>
      {modalType === ADD_BANK_DETAILS_MODAL && (
        <AppModal maxWidth="md">
          <div>
            <div>
              <h2 className="text-3xl mt-2  text-center font-bold">
                Add Bank Account
              </h2>
            </div>
            <div
              onClick={() => dispatch(hideModal())}
              className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-6"
            >
              <Close />
            </div>

            <form className="md:w-[90%]  mx-auto">
              <div className="mt-4 flex justify-center flex-col items-center">
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="bankName">
                    Bank Name
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="text"
                      name="bankName"
                      id="bankName"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Select Bank"
                    />
                    <Eye />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    className="text-gray-400 text-xs"
                    htmlFor="accountNumber"
                  >
                    Account Number
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="number"
                      name="accountNumber"
                      id="accountNumber"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Enter Accunt Number"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap items-center">
                <div className="w-full">
                  <label
                    className="text-gray-400 text-xs"
                    htmlFor="accountName"
                  >
                    Account Name
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="text"
                      name="accountName"
                      id="accountName"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Account Name"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="bvn">
                    BVN
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="text"
                      name="bvn"
                      id="bvn"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="BVN"
                    />
                  </div>
                </div>
              </div>

              <div className="my-2 flex justify-between items-center">
                <button className="bg-primary text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer">
                  Submit Account
                </button>
              </div>
            </form>
          </div>
        </AppModal>
      )}

      {modalType === DELETE_ACCOUNT_MODAL && (
        <AppModal>
          <div>
            <div>
              <h2 className="text-3xl mt-2  text-center font-bold">
                Delete Bank Account
              </h2>
            </div>
            <div
              onClick={() => dispatch(hideModal())}
              className={clsx(
                "absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 rounded-l-lg cursor-pointer top-6",
                theme === "light" ? "bg-gray-100" : " bg-neutral-800 "
              )}
            >
              <Close />
            </div>

            <div className="text-center p-2  flex justify-center items-center mx-auto">
              <TrashCan />
            </div>
            <div>
              <p className="text-center">
                Are you sure you want to delete this account ? This action
                cannot be undone
              </p>
            </div>
            <div className="mb-2 mt-4 w-8/12 mx-auto flex justify-between items-center">
              <button
                onClick={() => {
                  deleteAccount();
                  dispatch(hideModal());
                }}
                className="bg-orange-500 text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
              >
                Delete Acount
              </button>
            </div>
          </div>
        </AppModal>
      )}
    </>
  );
};

export default BankDetails;
