import React, { useState, FC, ChangeEvent, useEffect, ReactNode } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";

import Close from "../../../assets/svg/Close";
import TrashCan from "../../../assets/svg/TrashCan";
import AppModal from "../../../modals";
import { hideModal, showModal } from "../../../reducers/ui";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStoreHooks";
import { debounce } from "../../../lib/helpers";
import {
  useAddAccountDetailMutation,
  useDeleteABankDetailMutation,
  useFetchAccountDetailsMutation,
  useGetAllBankDetailsQuery,
} from "../../../services/settings";
import toast, { Toaster } from "react-hot-toast";
import {
  BankDetail,
  FetchAccountDetailsError,
  FetchAccountDetailsSuccess,
  GetBankDetailsInterface,
} from "../../../types/bankDetails";
// Types of modals in this component
const ADD_BANK_DETAILS_MODAL = "ADD_BANK_DETAILS_MODAL";
const DELETE_ACCOUNT_MODAL = "DELETE_ACCOUNT_MODAL";

interface BankFormFields {
  accountNumber: string;
  bankName: string;
  accountName: string;
  bvn: string;
}

const BankDetails = ({ data }: { children?: ReactNode; data: GetBankDetailsInterface }) => {
  const [fetchAccountDetails, { isLoading }] = useFetchAccountDetailsMutation();
  const [selectedId, setSelectedId] = useState("");
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { theme } = useTheme();
  const [accountDetails, setAccountDetails] = useState<FetchAccountDetailsSuccess>();
  const [bankformFields, setBankFormFields] = useState<BankFormFields>();
  const [bvn, setBvn] = useState("");
  const [returnBankDetails, setReturnBankDetails] = useState<GetBankDetailsInterface>(data);
  const [deleteAnAccount, status] = useDeleteABankDetailMutation();
  const [addAnAccountDetail] = useAddAccountDetailMutation();
  const { modalType } = useAppSelector((state) => state.ui);
  const [errorFromBankDetails, setErrorsFromBankDetails] = useState("");

  const handleDeleteAccount = (accountNumber: string) => {
    deleteAnAccount({ accountNumber })
      .unwrap()
      .then((res: any) => {
        toast.success("Account deleted successful");
      })
      .catch((error: any) => {
        console.log(error, "there was an error deleting the account");
      });
  };

  const onSubmit = (data: BankFormFields) => {
    addAnAccountDetail({
      bvn,
      accountNumber: accountDetails?.account_number,
      bankName: accountDetails?.bank_name,
      bankCode: accountDetails?.bank_code,
      accountName: accountDetails?.account_name,
    })
      .unwrap()
      .then((res: any) => {
        setReturnBankDetails((prevState) => ({ data, ...prevState }));
        toast.success("Account added successful");
        dispatch(hideModal());
        reset();
      })
      .catch((err: any) => {
        console.error("something went wrong", err);
        dispatch(hideModal());
      });
  };

  const handleBvnFieldChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setBvn(event.target.value);
  };

  // this function will be modifield if the fields wunt be disabled any more
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    name as keyof BankFormFields;
    setBankFormFields((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleAccountNumberChange = debounce<ChangeEvent<HTMLInputElement>>(
    (event: ChangeEvent<HTMLInputElement>) => {
      fetchAccountDetails({ accountNo: event.target.value })
        .unwrap()
        .then((res: any) => {
          toast.success(res.message);
          setErrorsFromBankDetails("");
          setAccountDetails(res?.payload);
        })
        .catch((err: FetchAccountDetailsError) => {
          if (err?.status === 400) {
            setErrorsFromBankDetails(err?.data?.message);
            return toast.error(err?.data?.message);
          }
          return toast.error("Something went wrong");
        });
    }
  );

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full min-h-[60vh]">
        {returnBankDetails?.payload !== null ? (
          returnBankDetails?.payload?.bankDetail.length ? (
            returnBankDetails?.payload?.bankDetail.map(
              ({ accountName, accountNumber, _id, bankName, bvn }: BankDetail) => {
                return (
                  <div
                    key={_id}
                    className="flex  items-center justify-between w-full py-6 mb-3 border-b"
                  >
                    <div className="flex flex-col items-start">
                      <p className="font-semibold">{accountName}</p>
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
                          setSelectedId(accountNumber);
                        }}
                        className="bg-red-500 text-white rounded-full px-6 py-2 space-x-3  cursor-pointer flex items-center justify-between "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="h-20 w-full grid place-items-center mx-aut">
              <h1 className="text-center text-xl font-bold">Youve not added any bank details</h1>
            </div>
          )
        ) : (
          <div className="h-20 w-full grid place-items-center mx-aut">
            <div className="w-3/12 mx-auto h-auto flex flex-col justify-center items-center ">
              <h3>Bank Details</h3>
              <p className="text-center">You do not have any bank account added</p>
            </div>
          </div>
        )}
        <div className="flex items-center h-full flex-col justify-center">
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
              <h2 className="text-3xl mt-2  text-center font-bold">Add Bank Account</h2>
            </div>
            <div
              onClick={() => dispatch(hideModal())}
              className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-6"
            >
              <Close />
            </div>

            <form className="md:w-[90%]  mx-auto" onSubmit={handleSubmit(onSubmit)}>
              {isLoading && <p className="text-center">Trying to fetch your details</p>}
              <div className="mt-4 flex justify-center flex-col items-center">
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="accountNumber">
                    Account Number
                  </label>
                  <div
                    className={`mt-3 mb-1 flex justify-between flex-col items-center px-2 border rounded-xl ${
                      errorFromBankDetails.length ? "border-red-500" : null
                    }`}
                  >
                    <input
                      type="text"
                      {...register("accountNumber", { required: true })}
                      onChange={handleAccountNumberChange}
                      id="accountNumber"
                      // value={accountDetails?.account_number ? accountDetails?.account_number : ""}
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Enter Accunt Number"
                    />
                  </div>
                  {errorFromBankDetails.length ? (
                    <span className="text-red-500 text-sm">{errorFromBankDetails}</span>
                  ) : null}
                </div>
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="bankName">
                    Bank Name
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="text"
                      value={accountDetails?.bank_name ? accountDetails?.bank_name : ""}
                      {...register("bankName")}
                      id="bankName"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Select Bank"
                      disabled
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap items-center">
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="accountName">
                    Account Name
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="text"
                      value={accountDetails?.account_name ? accountDetails?.account_name : ""}
                      {...register("accountName")}
                      id="accountName"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Account Name"
                      onChange={handleFieldChange}
                      disabled
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
                      {...register("bvn")}
                      id="bvn"
                      value={bvn}
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="BVN"
                      onChange={handleBvnFieldChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="my-2 flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-primary text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
                >
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
              <h2 className="text-3xl mt-2  text-center font-bold">Delete Bank Account</h2>
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
                Are you sure you want to delete this account ? This action cannot be undone
              </p>
            </div>
            <div className="mb-2 mt-4 w-8/12 mx-auto flex justify-between items-center">
              <button
                onClick={() => {
                  handleDeleteAccount(selectedId);
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
      <Toaster />
    </>
  );
};

export default BankDetails;
