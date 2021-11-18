import React from "react";

interface Props {}

const Landingpage = (props: Props): JSX.Element => {
  const test: Itest = {
    test: "testing",
  };
  return <div className=" text-9xl">{test.test}</div>;
};

export default Landingpage;
