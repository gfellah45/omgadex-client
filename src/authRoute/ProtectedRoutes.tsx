import React, { FC, useEffect } from "react";
import { useAppSelector } from "../hooks/useStoreHooks";
import { useRouter } from "next/router";
import { RootState } from "../store";

export type Props = {
  children?: React.ReactNode;
};

const ProtectedRoutes: FC = ({ children }: Props) => {
  const { push, pathname, back } = useRouter();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const authRoute = [
    "/",
    "/login",
    "/signup",
    "/verify-code",
    "/verify",
    "/forgot-password",
    "/forgotpassordinput",
  ];

  if (token && authRoute.includes(pathname)) {
    back();
    return null;
  }

  return <div>{children}</div>;
};

export default ProtectedRoutes;
