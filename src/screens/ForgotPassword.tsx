import React from "react";
import AuthLayout from "../components/shared/AuthLayout";

interface Props {}

const ForgotPassword = (props: Props) => {
  return (
    <div>
      <AuthLayout>
        <div className="w-full">
          <h3 className="text-4xl text-center font-poppins">Forgot Password</h3>

          <p className="w-10/12 mx-auto mt-8 text-center font-poppins text-links">
            For security purposes, no withdrawals are permitted for 24 hours
            after password changed.
          </p>
          <div className="w-full mt-28">
            <input type="text" className="w-full border-2" />
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default ForgotPassword;
