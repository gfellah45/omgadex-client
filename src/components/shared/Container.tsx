import React, { FC } from "react";

const Container: FC = ({ children }) => {
  return <div className="w-11/12 mx-auto ">{children}</div>;
};

export default Container;
