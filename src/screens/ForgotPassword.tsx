import React, { FC } from "react";
import AuthLayout from "../components/shared/AuthLayout";
import Inputs from "../components/shared/Inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { makeRequest } from "../lib/makeRequest";
import toast, { Toaster } from "react-hot-toast";
import { setData } from "../utils";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";

interface Iinputs {
  email: string;
}

const ForgotPassword: FC = () => {
  const resetPassword = async (data: Iinputs) => {
    return await makeRequest("/auth/forgot-password", "PATCH", data);
  };

  const { mutateAsync, isLoading } = useMutation(resetPassword);

  const { push } = useRouter();

  const onFinish: SubmitHandler<Iinputs> = async (values) => {
    mutateAsync(values, {
      onSuccess: (data) => {
        setData("token", data.payload);
        if (data.message.includes("No user exists")) {
          toast.error(data.message);
        } else {
          toast.success("Check your email for a reset link");
          push("/forgetpassordinput");
        }
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <AuthLayout>
        <form onSubmit={handleSubmit(onFinish)} className="w-full">
          <h3 className="text-2xl font-bold text-center lg:text-4xl font-poppins">
            Forgot Password
          </h3>

          <p className="w-11/12 mx-auto mt-8 text-xs text-center lg:text-md font-poppins text-links">
            For security purposes, no withdrawals are permitted for 24 hours
            after password changed.
          </p>

          <div className="h-[1px] bg-omgray2 w-full mt-8"></div>
          <div className="w-full mt-8">
            <Inputs
              register={register}
              name="email"
              type="email"
              addOns={true}
              errors={errors}
              label="Enter the account email"
              placeholder="Your Email"
            />
          </div>

          <div className="mt-8">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full px-4 py-2 font-bold text-white rounded-md hover:opacity-75 bg-primary bg-blue"
            >
              {isLoading ? (
                <div className="flex items-center justify-center w-full">
                  <Loader
                    type="ThreeDots"
                    color="#fff"
                    height={30}
                    width={60}
                  />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        <Toaster />
      </AuthLayout>
    </div>
  );
};

export default ForgotPassword;
