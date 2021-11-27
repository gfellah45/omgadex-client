import React, { FC } from "react";
import { Tween } from "react-gsap";

interface Props {
  delay?: number;
}

const FadeIn: FC<Props> = ({ children, delay }) => {
  return (
    <Tween
      from={{ opacity: 0, delay: delay }}
      ease="back.out(1.4)"
      duration={1}
    >
      {children}
    </Tween>
  );
};

export default FadeIn;
