import React, { FC } from "react";

const Withdraw: FC = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#4FBF67" />
      <path
        d="M22 16.5L24.5 12.5H15.5L18 16.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 16.5H18C18 16.5 13.5 19.722 13.5 23.056C13.5 25.278 15.125 27.5 20 27.5C24.875 27.5 26.5 25.278 26.5 23.056C26.5 19.722 22 16.5 22 16.5Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Withdraw;
