import React, {
  useState,
  FC,
  ChangeEvent,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useForm, SubmitHandler } from 'react-hook-form';

import Close from '../../../assets/svg/Close';
import TrashCan from '../../../assets/svg/TrashCan';
import AppModal from '../../../modals';
import { hideModal, showModal } from '../../../reducers/ui';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStoreHooks';
import { debounce } from '../../../lib/helpers';
import {
  useAddAccountDetailMutation,
  useDeleteABankDetailMutation,
  useFetchAccountDetailsMutation,
  useGetAllBankDetailsQuery,
} from '../../../services/settings';
import toast, { Toaster } from 'react-hot-toast';
import {
  BankDetail,
  FetchAccountDetailsError,
  FetchAccountDetailsSuccess,
  GetBankDetailsInterface,
} from '../../../types/bankDetails';
import { isEmpty } from 'lodash';
// Types of modals in this component
const ADD_BANK_DETAILS_MODAL = 'ADD_BANK_DETAILS_MODAL';
const DELETE_ACCOUNT_MODAL = 'DELETE_ACCOUNT_MODAL';

interface IBankFormFields {
  accountNumber: string;
  bankName: string;
  accountName: string;
  bvn: string;
}

const BankDetails = ({
  data,
}: {
  children?: ReactNode;
  data: GetBankDetailsInterface;
}) => {
  const [selectedId, setSelectedId] = useState('');

  const [bankCode, setBankCode] = useState('');

  const [deleteAnAccount] = useDeleteABankDetailMutation();
  const [addAnAccountDetail, { isLoading: addAccountLoading }] =
    useAddAccountDetailMutation();
  const { modalType } = useAppSelector((state) => state.ui);

  // hooks
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IBankFormFields>();

  const [fetchAccountDetails, { isLoading }] = useFetchAccountDetailsMutation();

  const accountNo = watch('accountNumber');

  const getAccountBumber = useCallback(async () => {
    if (!isEmpty(accountNo) && accountNo.length === 10) {
      try {
        const resp = await fetchAccountDetails({
          accountNo,
        }).unwrap();
        setValue('accountName', resp.payload.account_name);
        setValue('bankName', resp.payload.bank_name);
        setBankCode(resp.payload.bank_code);
      } catch (e: any) {
        if (!isEmpty(e.data)) {
          console.log(e);
          toast.error(e.data.message);
        } else {
          console.log(e);
        }
      }
    }
  }, [accountNo, fetchAccountDetails, setValue]);

  useEffect(() => {
    getAccountBumber();
  }, [getAccountBumber]);

  const handleDeleteAccount = (selectedId: string) => {
    deleteAnAccount({ accountNumber: selectedId })
      .unwrap()
      .then((res: any) => {
        toast.success('Account deleted successful');
      })
      .catch((error: any) => {
        console.log(error, 'there was an error deleting the account');
      });
  };

  const onSubmit: SubmitHandler<IBankFormFields> = async (data) => {
    try {
      const resp = await addAnAccountDetail({
        accountNumber: data.accountNumber,
        bankName: data.accountName,
        bankCode: bankCode,
        accountName: data.bankName,
        bvn: data.bvn,
      }).unwrap();
      if (!isEmpty(resp)) {
        toast.success('Account added successful');
        dispatch(hideModal());
        reset();
      }
    } catch (e: any) {
      if (!isEmpty(e.data)) {
        toast.error(e.data.message);
      } else {
        toast.error('There was an error adding the account');
      }

      // dispatch(hideModal());
    }
  };

  return (
    <>
      <div className="w-full min-h-[60vh]">
        {!isEmpty(data?.payload) ? (
          data.payload?.bankDetail.length ? (
            data?.payload?.bankDetail.map(
              ({
                accountName,
                accountNumber,
                _id,
                bankName,
                bvn,
              }: BankDetail) => {
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
                            }),
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
              },
            )
          ) : (
            <div className="h-20 w-full grid place-items-center mx-aut">
              <h1 className="text-center text-xl font-bold">
                Youve not added any bank details
              </h1>
            </div>
          )
        ) : (
          <div className="h-20 w-full grid place-items-center mx-aut">
            <div className="w-3/12 mx-auto h-auto flex flex-col justify-center items-center ">
              <h3>Bank Details</h3>
              <p className="text-center">
                You do not have any bank account added
              </p>
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
                }),
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

            <form
              className="md:w-[90%]  mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              {isLoading && (
                <p className="text-center">Trying to fetch your details</p>
              )}
              <div className="mt-4 flex justify-center flex-col items-center">
                <div className="w-full">
                  <label
                    className="text-gray-400 text-xs"
                    htmlFor="accountNumber"
                  >
                    Account Number
                  </label>
                  <div
                    className={`mt-3 mb-1 flex justify-between flex-col items-center px-2 border rounded-xl 
                    
                    }`}
                  >
                    <input
                      type="number"
                      {...register('accountNumber', {
                        required: 'This field is required',
                        minLength: {
                          value: 10,
                          message:
                            'Account number must be at least 10 characters',
                        },
                        maxLength: {
                          value: 10,
                          message: 'Account number must be 10 Characters',
                        },
                      })}
                      minLength={10}
                      maxLength={10}
                      id="accountNumber"
                      // value={accountDetails?.account_number ? accountDetails?.account_number : ""}
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Enter Accunt Number"
                    />
                  </div>

                  <span className="text-red-500 text-sm">
                    {errors['accountNumber']?.message}
                  </span>
                </div>
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="bankName">
                    Bank Name
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="text"
                      {...register('bankName')}
                      id="bankName"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Select Bank"
                      disabled
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
                      {...register('accountName')}
                      id="accountName"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Account Name"
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
                      type="number"
                      {...register('bvn', {
                        required: 'This is required',
                        minLength: {
                          value: 11,
                          message: 'BNV number must be at least 11 characters',
                        },
                        maxLength: {
                          value: 11,
                          message: 'BVN number must be 11 Characters',
                        },
                      })}
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="BVN"
                    />
                  </div>
                  <span className="text-red-500 text-sm">
                    {errors['bvn']?.message}
                  </span>
                </div>
              </div>

              <div className="my-2 flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-primary text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
                >
                  {addAccountLoading ? 'Adding...' : 'Add Bank Account'}
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
                'absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 rounded-l-lg cursor-pointer top-6',
                theme === 'light' ? 'bg-gray-100' : ' bg-neutral-800 ',
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
