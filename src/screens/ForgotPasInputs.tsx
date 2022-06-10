// @ts-nocheck
import React, { ReactElement } from "react";
import AuthLayout from "../components/shared/AuthLayout";
import Inputs from "../components/shared/Inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordValidator } from "../utils";

import Loader from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useForgotPasswordMutation } from "../services/forgotPass";

interface Iinputs {
  password: string;
  password2: string;
  code: string;
}

function ForgotPasInputs(): ReactElement {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const { push } = useRouter();

  const [forgotPassword, result] = useForgotPasswordMutation();

  const { isLoading } = result;

  const onFinish: SubmitHandler<Iinputs> = (values) => {
    const newValues = {
      password: values.password,
      code: values.code,
    };

    forgotPassword(newValues)
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success("Password changed successfully");
          push("/login");
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          toast.error("Code invalid Kindly input the correct code");
        }
        console.log(err);
      });
  };
  return (
    <AuthLayout>
      <div className="mt-16">
        <h3 className="text-3xl text-center">Reset Password</h3>

        <form onSubmit={handleSubmit(onFinish)}>
          <div className="mt-6">
            <Inputs
              register={register}
              errors={errors}
              validation={{
                required: "This is required",
                validate: (value: string) =>
                  passwordValidator(value) ||
                  "Must be min of 8 in length, at least 1 uppercase and 1 character and number",
              }}
              name="password"
              label="New Password"
              placeholder="New password"
              type="password"
            />
          </div>

          <div className="mt-6">
            <Inputs
              type="password"
              register={register}
              errors={errors}
              validation={{
                required: "This is required",
                validate: (value: string) => value === password || "Passwords do not match",
              }}
              name="password2"
              label="Repeat Password"
              placeholder="Repeat password"
            />
          </div>

          <div className="mt-6">
            <Inputs
              type="text"
              register={register}
              errors={errors}
              validation={{ required: "This is required" }}
              name="code"
              label="Verification Code"
              placeholder="Verification code"
              minLength={1}
              maxLength={4}
            />
          </div>

          <div className="mt-8">
            <div className="w-full px-4 py-3 text-white rounded-md shadow hover:opacity-75 bg-primary">
              {isLoading ? (
                <div className="flex items-center justify-center w-full">
                  <Loader type="ThreeDots" color="#fff" height={30} width={60} />
                </div>
              ) : (
                " Submit"
              )}
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </AuthLayout>
  );
}

export default ForgotPasInputs;
