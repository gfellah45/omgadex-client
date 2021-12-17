import React, { useState } from "react";

import Msg from "../../assets/svg/Msg";
import Eye from "../../assets/svg/Eye";

interface Props {
  type?: string;
  placeholder?: string;
  text?: string;
  label?: string;
  name?: string;
  register?: any;
  validation?: any;
  errors?: any;
  addOns?: boolean;
  minLength?: number;
  maxLength?: number;
}

const Inputs = ({
  type,
  placeholder,
  label,
  name,
  register,
  validation,
  errors,
  addOns,
  minLength,
  maxLength,
}: Props): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label
        className="inline-block my-1"
        style={{ color: "#B1B5C4" }}
        htmlFor={name}
      >
        {label}
      </label>
      <div
        style={{ borderColor: "#E5E5E5" }}
        className="relative flex w-full border rounded-md "
      >
        <input
          {...register(name, { ...validation })}
          minLength={minLength}
          maxLength={maxLength}
          name={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full h-full px-2 py-2 text-sm rounded-md lg:text-lg lg:py-3 focus:outline-none active:bg-opacity-0 active:bg-white"
        />
        {type === "password" && (
          <p
            className="absolute cursor-pointer right-2 top-1 lg:top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Eye />
          </p>
        )}

        {addOns && (
          <p className="absolute cursor-pointer right-2 top-1 lg:top-2">
            <Msg />
          </p>
        )}
      </div>
      <div className="my-2 text-sm text-red-500 ">
        {errors[`${name}`]?.message}
      </div>
    </>
  );
};

export default Inputs;
