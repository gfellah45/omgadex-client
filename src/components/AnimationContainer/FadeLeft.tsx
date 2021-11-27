import React, { FC } from "react";
import { Tween } from "react-gsap";

const FadeLeft: FC = ({ children }) => {
  return (
    <Tween
      from={{ opacity: 0, transform: "translate3d(-100vw, 0, 0)" }}
      ease="back.out(1.4)"
    >
      {children}
    </Tween>
  );
};

export default FadeLeft;
