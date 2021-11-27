import React, { FC } from "react";

interface Props {
  color?: string;
}

const RadioBtn: FC<Props> = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="#FCFCFD"
      />
      <rect x="6" y="6" width="12" height="12" rx="6" fill={color} />
      <path
        d="M12 22C6.47715 22 2 17.5228 2 12H-2C-2 19.732 4.26801 26 12 26V22ZM22 12C22 17.5228 17.5228 22 12 22V26C19.732 26 26 19.732 26 12H22ZM12 2C17.5228 2 22 6.47715 22 12H26C26 4.26801 19.732 -2 12 -2V2ZM12 -2C4.26801 -2 -2 4.26801 -2 12H2C2 6.47715 6.47715 2 12 2V-2Z"
        fill="#E6E8EC"
      />
    </svg>
  );
};

export default RadioBtn;
