import React, { FC, useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import VoucherCard from "./VoucherCard";
import RectangleSvg from "../../assets/svg/RectangleSvg";
import OvalSvg from "../../assets/svg/OvalSvg";
import PlusAdd from "../../assets/svg/PlusAdd";
import VoucherLogo from "../../assets/svg/VoucherLogo";
import AppModal from "../../modals";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { hideModal } from "../../reducers/ui";
import {
  useGetRecentRateQuery,
  useVerifyPaymentQuery,
} from "../../services/vouchers";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";
import { useTheme } from "next-themes";

type IPaymentDetails = {
  amountInDollars: number;
  amountInNaira: number;
  rate: number;
  txnRef: string;
};

const VouchersScreen: FC = () => {
  const dispatch = useAppDispatch();

  const { email, firstName } = useAppSelector((state) => state.auth.user);

  const [details, setDetails] = useState<IPaymentDetails>({
    amountInDollars: 0,
    amountInNaira: 0,
    rate: 0,
    txnRef: "",
  });

  const { data, isSuccess } = useGetRecentRateQuery();

  useEffect(() => {
    setDetails({
      ...details,
      rate: Number(data?.payload.nairaEquivalence) || 0,
    });
  }, [isSuccess]);
  const [ref, setRef] = useState("");

  const { refetch, isSuccess: confirmSuccess } = useVerifyPaymentQuery(ref);

  useEffect(() => {
    if (confirmSuccess) {
      toast.success(
        "Payment Successful. Please Check you Email for your Voucher Code"
      );
    }
  }, [confirmSuccess]);

  const handlePaystackSuccessAction = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference) {
      setRef(reference.trxref);
      refetch();
      dispatch(hideModal());
    }
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const config = {
    publicKey: "pk_test_8a379d8bc67e6c9e77c337fa852de6c641d81063",
    email,
    amount: details.amountInNaira * 100,
    reference: details.txnRef,
  };

  const componentProps = {
    ...config,
    text: "Confirm",
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const Vouchers = [
    {
      id: 1,
      value: "1K",
      icon: <OvalSvg />,
      amount: 1000,
    },
    {
      id: 2,
      value: "2K",
      icon: <RectangleSvg />,
      amount: 2000,
    },
    {
      id: 3,
      value: "3K",
      icon: <OvalSvg />,
      amount: 3000,
    },
    {
      id: 4,
      value: "4K",
      icon: <RectangleSvg />,
      amount: 4000,
    },
    {
      id: 5,
      value: "5K",
      icon: <OvalSvg />,
      amount: 5000,
    },
  ];

  const { theme } = useTheme();
  return (
    <div className="flex flex-col flex-1 px-6">
      {/* heading */}
      <div
        className={clsx(
          "px-5 py-4 text-4xl font-bold rounded-2xl",
          theme === "light" ? "bg-white" : "bg-neutral-800"
        )}
      >
        Available Vouchers
      </div>

      {/* list of vouchers */}

      <div className="grid grid-cols-3 gap-5 my-5 ">
        {Vouchers.map((item) => (
          <VoucherCard
            key={item.id}
            {...item}
            setDetails={setDetails}
            details={details}
          />
        ))}
        <div className="relative flex flex-col items-center justify-center w-full px-4 py-3 bg-gray-700 shadow-sm cursor-pointer rounded-xl">
          <div className="absolute flex flex-col justify-center text-white top-4 left-3">
            <VoucherLogo />
            <div className="text-xs text-center text-white">Voucher</div>
          </div>
          <div className="cursor-pointer">
            <PlusAdd />
          </div>
        </div>
      </div>
      <AppModal>
        <div>
          <div className="py-4 text-lg text-center">
            <div>
              <p>
                Hello{" "}
                <span className="font-bold text-primary">{firstName}</span> You
                are about to purchace a voucher.
              </p>
              <p>
                Click on
                <span className="font-semibold text-green-500"> confirm </span>
                to proceed or
                <span className="font-semibold text-red-500"> cancel </span> to
                abort
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full p-4 mt-8">
            <button
              onClick={() => dispatch(hideModal())}
              className="px-4 py-2 text-white bg-red-500 rounded-lg shadow-md shadow-red-500"
            >
              Cancel
            </button>
            <PaystackButton
              className="px-4 py-2 text-white bg-green-500 rounded-lg shadow-md shadow-green-500"
              {...componentProps}
            />
            {/* <button className="px-4 py-2 text-white bg-green-500 rounded-lg shadow-md shadow-green-500">
              Confirm
            </button> */}
          </div>
        </div>
      </AppModal>
      <Toaster
        toastOptions={{
          position: "top-right",
          duration: 9000,
        }}
      />
    </div>
  );
};

export default VouchersScreen;
