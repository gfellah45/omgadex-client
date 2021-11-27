import React, { FC, useState, useEffect } from "react";
import RadioBtn from "../assets/svg/RadioBtn";
import AuthLayout from "../components/shared/AuthLayout";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const VerifyAccount: FC = () => {
  const [phone, setPhone] = useState(true);
  const [email, setEmail] = useState(false);
  const [tempData, setTempData] = useState("");

  const router = useRouter();

  const nextPage = () => {
    if (email) {
      router.push("/verify-code");
    } else {
      toast.error(
        "Please select an option, we support only email verification at the momet"
      );
    }
  };

  const temail: string = tempData ? JSON.parse(tempData).email : "";
  const tphone: string = tempData ? JSON.parse(tempData).phone : "";

  const hide =
    temail.slice(0, temail.lastIndexOf("@") - 3) +
    "****" +
    temail.slice(temail.lastIndexOf("@"));

  const hidePhone = tphone.slice(0, 5) + "****";

  useEffect(() => {
    setTempData(localStorage.getItem("tempdata") || "");
  }, []);

  return (
    <AuthLayout>
      <div>
        <h2 className="text-3xl font-bold text-center lg:text-5xl ">
          Let’s confirm it’s really you
        </h2>
        <p className="w-10/12 mx-auto mt-6 text-center text-links">
          Help us secure your account. Please complete the verifications below
        </p>

        <div className="flex mt-10 space-x-4">
          <div onClick={() => setPhone(!phone)}>
            <RadioBtn color={phone ? "#3772FF" : "#F4F4F4"} />
          </div>
          <div className="w-8/12 font-semibold">
            Get the code by text message (SMS) at {hidePhone}
          </div>
        </div>
        <div className="flex mt-5 space-x-4">
          <div onClick={() => setEmail(!email)}>
            <RadioBtn color={email ? "#3772FF" : "#F4F4F4"} />
          </div>
          <div className="w-9/12 font-semibold">
            Get the code by email at {hide}
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={() => nextPage()}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:opacity-75"
          >
            Continue
          </button>
        </div>
        <Toaster />
      </div>
    </AuthLayout>
  );
};
export default VerifyAccount;
