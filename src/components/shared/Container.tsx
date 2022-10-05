import React, { FC, ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="w-11/12 mx-auto ">{children}</div>;
};

export default Container;
