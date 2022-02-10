import React, { FC, useEffect } from "react";
import { useAppSelector } from "../hooks/useStoreHooks";
import { useRouter } from "next/router";

const ProtectedRoutes: FC = ({ children }) => {
  const { push, pathname, back } = useRouter();
  const token = useAppSelector((state) => state.auth.token);

  const authRoute = [
    "/",
    "/login",
    "/signup",
    "/verify-code",
    "/verify",
    "/forgot-password",
    "/forgotpassordinput",
  ];

  useEffect(() => {
    if (!token && !authRoute.includes(pathname)) {
      push("/login");
    }
    if (token && authRoute.includes(pathname)) {
      back();
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
