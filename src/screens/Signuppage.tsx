import React from "react";
import AuthLayout from "../components/shared/AuthLayout";
import FormLayout from "../components/shared/FormLayout";
import Inputs from "../components/shared/Inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { makeRequest } from "../lib/makeRequest";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { passwordValidator } from "../utils";
import Loader from "react-loader-spinner";

interface Iinputs {
  email: string;
  password: string;
  password2: string;
  phone: string;
  terms: boolean;
}

const Signuppage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm();

  const { push } = useRouter();

  const password = watch("password");

  const singUp = async (data: Iinputs) => {
    return await makeRequest("/auth/sign-up", "POST", data);
  };

  const { mutateAsync } = useMutation(singUp);

  const onFinish: SubmitHandler<Iinputs> = (values: Iinputs) => {
    mutateAsync(values, {
      onSuccess: (data) => {
        if (data.message.includes("already" || "exists")) {
          toast.error(data.message);
        } else {
          localStorage.setItem("tempdata", JSON.stringify(values));
          toast.success(
            "Succesfully signed up. please select a suitable verification method"
          );
          push("/verify");
        }
      },
      onError: () => {
        toast.error("Something went wrong please try again later");
      },
    });
  };
  return (
    <AuthLayout>
      <FormLayout
        heading="Sign up to Omega DEX"
        next="Already have an account? ?"
        action="Login"
        link="/login"
      >
        <form className="mt-6" onSubmit={handleSubmit(onFinish)}>
          <div className="mt-6">
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
            />
          </div>
          <div className="mt-6">
            <Inputs
              validation={{
                required: "This is required",
                pattern: {
                  value: /^[0]\d{10}$/,
                  message: "Invalid phone",
                },
              }}
              register={register}
              type="tel"
              placeholder="Phone Number"
              label="Phone Number"
              name="phone"
              errors={errors}
            />
          </div>
          <div className="relative mt-6">
            <Inputs
              validation={{
                required: "This is required",
                validate: (value: string) => passwordValidator(value),
              }}
              register={register}
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              errors={errors}
            />
            {password && !passwordValidator(password) && (
              <span className="fixed text-xs text-red-500">
                Must include at least 1 upper case 1 special character min of 8
                in length
              </span>
            )}
          </div>

          <div className="mt-6">
            <Inputs
              validation={{
                required: "This is required",
                validate: (value: string) =>
                  value === password || "The passwords do not match",
              }}
              register={register}
              type="password"
              placeholder="Confirm passowrd"
              label="Confirm password"
              name="password2"
              errors={errors}
            />
          </div>
          <div className="flex mt-8 space-x-1">
            <input type="checkbox" {...register("terms", { required: true })} />
            <p className="text-xs text-links">
              By signing up I agree that I’m 18 years of age or older, to the
              <span className="mx-2 font-semibold text-black">
                User Agreements, Privacy Policy, Cookie Policy, E-Sign Consent.
              </span>
            </p>
          </div>

          {/* login button */}
          <div className="mt-6">
            <button className="w-full p-2 font-semibold tracking-wide text-white text-gray-100 bg-blue-500 rounded-lg shadow-lg lg:p-4 hover:opacity-75 font-display focus:outline-none focus:shadow-outline hover:bg-blue-600">
              {isSubmitting ? (
                <Loader type="ThreeDots" color="#fff" height={20} width={20} />
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
        <Toaster />
      </FormLayout>
    </AuthLayout>
  );
};

export default Signuppage;
