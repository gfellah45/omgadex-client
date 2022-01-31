import React, { useState, useEffect, FC } from "react";
import AuthLayout from "../components/shared/AuthLayout";
import Link from "next/link";
import logo from "../../public/assets/logo.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import {
  useVerifyUserMutation,
  useVerificationRequestMutation,
} from "../services/auth";

interface Inputs {
  A: string;
  B: string;
  C: string;
  D: string;
}

const VerifyCode: FC = () => {
  const [tempData, setTempData] = useState("");

  const { push } = useRouter();

  const { register, handleSubmit } = useForm();

  const [verifyUser, result] = useVerifyUserMutation();

  const [verificationRequest] = useVerificationRequestMutation();

  const { isLoading } = result;

  //grab email

  const email: string = tempData ? JSON.parse(tempData).email : "";

  // make new code request
  const getNewCode = () => {
    verificationRequest({ email })
      .then((res) => {
        if (res) {
          toast.success("Verifcation code has been sent to your email");
        }
      })
      .catch((error) => {
        toast.error("something went wrong pls try again later");
        console.log(error);
      });
  };

  useEffect(() => {
    setTempData(localStorage.getItem("tempdata") || "");
  }, []);

  //hide certain char of email
  const hide =
    email.slice(0, email.lastIndexOf("@") - 3) +
    "****" +
    email.slice(email.lastIndexOf("@"));

  //sunmit verified code
  const onFinish: SubmitHandler<Inputs> = (values) => {
    const trimValue = Object.values(values).join("").toUpperCase();

    verifyUser({ email: email, code: trimValue })
      .unwrap()
      .then((res) => {
        if (res.message) {
          toast.success(
            "Account activated successfully, please login to continue"
          );
          push("/login");
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          toast.error("Invalid actiovation code. Please try again");
        }
      });
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <div>
          <div className="flex flex-col items-center justify-center py-8 lg:hidden">
            <div>
              <Image src={logo} alt="logo" />
            </div>
            <div className="flex mt-4">
              <p className="text-xs font-bold text-center text-black lg:text-sm lg:mx-4 ">
                Don’t have an account?
              </p>
              <Link href="/signup">
                <span className="mx-2 text-xs cursor-pointer lg:mx-0 lg:text-sm text-primary hover:opacity-75 border-links">
                  Sign up for free
                </span>
              </Link>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-center md:text-4xl">
          Security verification
        </h3>
        <p className="mt-5 text-sm text-center text-links">
          To secure your account, please complete the following verification.
        </p>

        <p className="mt-2 text-sm text-center text-links">
          Enter the 4 digit code received{" "}
          <span className="font-bold text-black">{hide}</span>
        </p>

        <form onSubmit={handleSubmit(onFinish)}>
          <div className="flex items-center justify-between mt-10">
            <input
              {...register("A", { required: true, maxLength: 1, minLength: 1 })}
              maxLength={1}
              minLength={1}
              type="text"
              className="flex items-center justify-center w-1/5 h-20 px-3 text-3xl border-2 rounded-md lg:px-5 jus border-omgray2"
            />
            <input
              {...register("b", { required: true, maxLength: 1, minLength: 1 })}
              maxLength={1}
              minLength={1}
              type="text"
              className="flex items-center justify-center w-1/5 h-20 px-3 text-3xl border-2 rounded-md lg:px-5 jus border-omgray2"
            />
            <input
              {...register("C", { required: true, maxLength: 1, minLength: 1 })}
              maxLength={1}
              minLength={1}
              type="text"
              className="flex items-center justify-center w-1/5 h-20 px-3 text-3xl border-2 rounded-md lg:px-5 jus border-omgray2"
            />
            <input
              {...register("D", { required: true, maxLength: 1, minLength: 1 })}
              maxLength={1}
              minLength={1}
              type="text"
              className="flex items-center justify-center w-1/5 h-20 px-3 text-3xl border-2 rounded-md lg:px-5 jus border-omgray2"
            />
          </div>

          <div className="flex items-center justify-between w-full mt-12">
            <button
              disabled={isLoading}
              onClick={() => getNewCode()}
              className="w-5/12 py-2 text-sm text-black border-2 rounded-md shadow lg:py-4 border-links"
            >
              Resend code
            </button>
            <button
              type="submit"
              className="w-5/12 py-2 text-sm text-white rounded-md shadow lg:py-4 bg-primary"
            >
              {isLoading ? (
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center justify-center w-full">
                    <Loader
                      type="ThreeDots"
                      color="#fff"
                      height={30}
                      width={60}
                    />
                  </div>
                </div>
              ) : (
                " Continue"
              )}
            </button>
          </div>
        </form>

        <div className="items-center justify-center hidden mt-12 lg:flex">
          <p className="text-xs font-bold text-center text-black lg:text-sm lg:mx-4 ">
            Don’t have an account?
          </p>
          <Link href="/signup">
            <span className="mx-2 text-xs cursor-pointer lg:mx-0 lg:text-sm text-primary hover:opacity-75 border-links">
              Sign up for free
            </span>
          </Link>
        </div>
      </div>
      <Toaster />
    </AuthLayout>
  );
};

export default VerifyCode;
