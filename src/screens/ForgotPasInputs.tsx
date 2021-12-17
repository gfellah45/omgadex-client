import React, { ReactElement } from "react";
import AuthLayout from "../components/shared/AuthLayout";
import Inputs from "../components/shared/Inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordValidator } from "../utils";
import { useMutation } from "react-query";
import { makeRequest } from "../lib/makeRequest";
import Loader from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

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

  const resetPassword = async (data: {
    password: string;
    code: string;
  }): Promise<any> => {
    return await makeRequest("/auth/reset-password", "PATCH", data);
  };

  const { mutateAsync, isLoading } = useMutation(resetPassword);

  const password = watch("password");

  const { push } = useRouter();

  const onFinish: SubmitHandler<Iinputs> = (values) => {
    const newValues = {
      password: values.password,
      code: values.code,
    };
    mutateAsync(newValues, {
      onSuccess: (data) => {
        if (data.message.includes("Invalid token")) {
          toast.error("Invalid token, plseas provide correct token");
        } else {
          toast.success("Password Successfully Reset");
          push("/login");
        }
      },
    });
  };
  return (
    <AuthLayout>
      <div>
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
                validate: (value: string) =>
                  value === password || "Passwords do not match",
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
            <button className="w-full px-4 py-3 text-white rounded-md shadow hover:opacity-75 bg-primary">
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
                " Submit"
              )}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </AuthLayout>
  );
}

export default ForgotPasInputs;
