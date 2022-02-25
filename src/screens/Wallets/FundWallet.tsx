import React, { FC } from "react";
import Close from "../../assets/svg/Close";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "react-loader-spinner";
import { useAppDispatch } from "../../hooks/useStoreHooks";
import { hideModal } from "../../reducers/ui";
interface Props {
  action?: () => void;
  redeem?: any;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  error?: any;
}

const FundWallet: FC<Props> = ({
  action,
  redeem,
  isError,
  isLoading,
  isSuccess,
  error,
}) => {
  const { register, handleSubmit } = useForm();
  const redeemVoucher: SubmitHandler<{ voucher: string }> = async (values) => {
    await redeem(values.voucher).unwrap();
  };

  const dispatch = useAppDispatch();
  isSuccess && dispatch(hideModal());

  return (
    <div className="w-full">
      <div>
        <p className="text-2xl font-bold">Redeem Omega Voucher</p>
      </div>
      <div
        onClick={action}
        className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-6"
      >
        <Close />
      </div>

      <div className="mt-10">
        <form
          onSubmit={handleSubmit(redeemVoucher)}
          className="flex flex-wrap items-center justify-between"
        >
          <div className="w-7/12">
            <label className="block my-2 text-xs text-gray-500">
              Voucher Code
            </label>
            <input
              {...register("voucher", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
              type="text"
              placeholder="9H4R3-F98F4-34U34-4398Y"
            />
          </div>
          <div className="flex items-center justify-center flex-1 mt-8 ml-4">
            <button className="w-full px-4 py-2 text-white rounded-lg bg-primary hover:opacity-75">
              {isLoading ? (
                <p className="flex items-center justify-center w-full">
                  <Loader
                    type="ThreeDots"
                    color="#fff"
                    height={30}
                    width={60}
                  />
                </p>
              ) : (
                " Redeem Code"
              )}
            </button>
          </div>
        </form>

        {isError && (
          <div className="flex justify-between px-6 py-2 my-6 text-xs text-red-600 bg-red-100 rounded-lg">
            <p>{error?.data?.message}, try again! </p>
            <p>
              <a href="#">Contact Support</a>
            </p>
          </div>
        )}

        <div className="flex justify-center mt-2 item-center ">
          <p className="text-xs text-gray-500">
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
