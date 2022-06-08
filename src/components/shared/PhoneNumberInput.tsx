import React, { FC } from 'react';
import {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface Props {
  value?: string;
  onChange?: any;
  name?: string;
  errors?: any;
  register?: any;
  validation?: any;
}

const PhoneNumberInput: FC<Props> = ({
  value,
  onChange,
  name,
  errors,
  register,
  validation,
}) => {
  return (
    <>
      <label
        className="inline-block my-1"
        style={{ color: '#B1B5C4' }}
        htmlFor={'Phone'}
      >
        Mobile
      </label>
      <div className="flex flex-wrap justify-between flex-1">
        <PhoneInput
          onChange={onChange}
          value={value}
          placeholder="Enter phone number"
          style={{ borderColor: '#E5E5E5' }}
          international
          defaultCountry="NG"
          className="w-3/12 px-2 py-2 text-xs border-2 rounded-md lg:text-lg lg:py-3 focus:outline-none active:bg-opacity-0 active:bg-white"
        />
        <input
          {...register(name, { ...validation })}
          style={{ borderColor: '#E5E5E5' }}
          type="tel"
          className="w-8/12 px-2 border-2 rounded-md py- lg:text-lg lg:py-3 focus:outline-none active:bg-opacity-0 active:bg-white"
        />
      </div>
      <div className="fixed my-2 text-sm text-red-500">
        {errors[`${name}`]?.message}
      </div>
    </>
  );
};

export default PhoneNumberInput;
