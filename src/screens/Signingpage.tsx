import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthLayout from "../components/shared/AuthLayout";
import Inputs from "../components/shared/Inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import FormLayout from "../components/shared/FormLayout";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

import {
  useUserLoginMutation,
  useVerificationRequestMutation,
} from "../services/auth";
import AppModal from "../modals";
import { hideModal, showModal } from "../reducers/ui";
import { useAppDispatch } from "../hooks/useStoreHooks";
import { login, registerToken } from "../reducers/auth";

interface Iinputs {
  email: string;
  password: string;
}

const Signingpage = (): JSX.Element => {
  const [isEmail, setIsEmail] = useState(true);
  const [tempData, setTempData] = useState("");

  const [userLogin, result] = useUserLoginMutation();

  useEffect(() => {
    setTempData(localStorage?.getItem("tempdata") || "");
  }, []);

  const dispatch = useAppDispatch();

  const [verificationRequest] = useVerificationRequestMutation();

  const { push } = useRouter();

  const onClose = () => dispatch(hideModal());

  const onOpen = () => dispatch(showModal({ showModal: true }));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // verify account function
  const verifyAccount = () => {
    const data = JSON.parse(tempData);
    verificationRequest(data)
      .unwrap()
      .then((res) => {
        if (res.message.includes("activation")) {
          toast.success("Verifcation code has been sent to your email");
          push("/verify-code");
          onClose();
        }
      })
      .catch(() => {
        toast.error("something went wrong pls try again later");
      });
  };

  //login action function
  const onFinish: SubmitHandler<Iinputs> = (values) => {
    userLogin(values)
      .unwrap()
      .then((res) => {
        if (res.message) {
          dispatch(
            login({
              ...res.payload.user,
              address: res.payload.user.address,
            })
          );
          dispatch(
            registerToken({
              loginToken: res.payload.loginToken,
              refreshToken: res.payload.refreshToken,
            })
          );
          toast.success("Login successful, redirecting to dashboard");
          push("/dashboard");
        }
      })
      .catch((err) => {
        if (err.data?.message.includes("password")) {
          toast.error("Invalid login credetials, please confirm and try again");
        }
        if (err.data?.message.includes("email" || "phone")) {
          toast.error("Invalid email or phone number");
        }
        if (err.data?.message.includes("activated")) {
          localStorage.setItem("tempdata", JSON.stringify(values));
          onOpen();
        }
      });
  };

  const { isLoading } = result;

  return (
    <AuthLayout>
      <FormLayout
        heading="Sign in to Omega DEX"
        next="Don't have an account ?"
        action="Sign up for free"
        link="/signup"
      >
        <div className="space-x-4 text-center ">
          <button
            onClick={() => setIsEmail(!isEmail)}
            className={`p-1 px-4 py-2 font-semibold tracking-wide ${
              isEmail ? "text-white bg-black" : "text-black"
            }  rounded-full shadow-sm `}
          >
            Email
          </button>
          <button
            onClick={() => setIsEmail(!isEmail)}
            className={`p-1 px-4 py-2 font-semibold${
              !isEmail ? " bg-black text-white" : "text-black"
            } tracking-wide text-gray-100 bg-gray-200 rounded-full shadow-sm `}
          >
            Mobile
          </button>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(onFinish)}>
          <div className="mt-6">
            {isEmail ? (
              <Inputs
                validation={{
                  required: "This is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                register={register}
                type="email"
                placeholder="Email Address"
                label="Email"
                name="email"
                errors={errors}
                addOns={true}
              />
            ) : (
              <Inputs
                validation={{
                  required: "This is required",
                  pattern: {
                    value: /^[0]\d{10}$/,
                    message: "Invalid phone number",
                  },
                }}
                register={register}
                type="tel"
                placeholder="+234"
                label="Phone Number"
                name="phone"
                errors={errors}
              />
            )}
          </div>
          <div className="mt-6">
            <Inputs
              validation={{ required: "This is required" }}
              register={register}
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              errors={errors}
            />
            <div className="w-2/5 mt-3 ml-auto text-right">
              <Link href="/forgotpassword">
                <a className="inline-block text-xs font-semibold cursor-pointer cursor-point er text-primary font-poppins font-display hover:text-indigo-800">
                  Forgot Password?
                </a>
              </Link>
            </div>
          </div>

          {/* login button */}
          <div className="mt-6">
            <button
              disabled={isLoading}
              className="w-full p-2 font-semibold tracking-wide text-white bg-blue-500 rounded-lg shadow-lg lg:p-4 hover:opacity-75 font-display focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              <p>
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
                  "Log In"
                )}
              </p>
            </button>
          </div>
        </form>
        <Toaster />
        <AppModal>
          <div className="bg-white ">
            <h2 className="text-2xl font-bold">Unverified Account</h2>
            <p className="mt-6 text-links">
              This account is not verified. Please verify your account to login.
            </p>
            <div className="mt-8">
              <button
                onClick={() => verifyAccount()}
                className="px-6 py-2 text-white rounded-md shadow-md bg-primary hover:opacity-75"
              >
                Verify account
              </button>
            </div>
          </div>
        </AppModal>
      </FormLayout>
    </AuthLayout>
  );
};

export default Signingpage;
