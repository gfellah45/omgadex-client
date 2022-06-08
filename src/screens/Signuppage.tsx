// @ts-nocheck
import React from 'react';
import AuthLayout from '../components/shared/AuthLayout';
import FormLayout from '../components/shared/FormLayout';
import Inputs from '../components/shared/Inputs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { passwordValidator } from '../utils';
import Loader from 'react-loader-spinner';
import PhoneNumberInput from '../components/shared/PhoneNumberInput';
import { useCreateUserMutation } from '../services/auth';

interface Iinputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
  phone: string;
  terms: boolean;
  country: string;
}

const Signuppage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const { push } = useRouter();

  const password = watch('password');

  const [createUser, result] = useCreateUserMutation();

  const { isLoading } = result;

  const onFinish: SubmitHandler<Iinputs> = (values: Iinputs) => {
    createUser(values)
      .unwrap()
      .then((res) => {
        if (res.message.includes('successfully created ')) {
          localStorage.setItem('tempdata', JSON.stringify(values));
          toast.success(
            'Succesfully signed up. please select a suitable verification method',
          );
          push('/verify-code');
        }
      })
      .catch((err) => {
        if (err.data?.message.includes('already' || 'exists')) {
          toast.error('A user already exists with the email');
        } else {
          toast.error('Something went wrong please try again later');
        }
      });
  };
  return (
    <AuthLayout>
      <FormLayout
        heading="Sign up to Lajeni"
        next="Already have an account? ?"
        action="Login"
        link="/login"
      >
        <form className="mt-6 " onSubmit={handleSubmit(onFinish)}>
          <div className="mt-6">
            <Inputs
              validation={{
                required: 'This is required',
              }}
              register={register}
              type="text"
              placeholder="First Name"
              label="First Name"
              name="firstName"
              errors={errors}
            />
          </div>
          <div className="mt-6">
            <Inputs
              validation={{
                required: 'This is required',
              }}
              register={register}
              type="text"
              placeholder="Last Name"
              label="Last Name"
              name="lastName"
              errors={errors}
            />
          </div>
          <div className="mt-6">
            <Inputs
              validation={{
                required: 'This is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              register={register}
              type="email"
              placeholder="Email Address"
              label="Email"
              name="email"
              errors={errors}
              addOns={true}
            />
          </div>
          <div className="mt-6 ">
            {/* <Controller
              name="country"
              control={control}
              rules={{ required: "This is required" }}
              render={({ field: { onChange, value } }) => (
                <PhoneNumberInput
                  onChange={onChange}
                  value={value}
                  register={register}
                  validation={{ required: "This is required" }}
                  name="phone"
                  errors={errors}
                />
              )}
            /> */}

            <Inputs
              validation={{
                required: 'This is required',
                pattern: {
                  value: /^[0]\d{10}$/,
                  message: 'Invalid phone',
                },
              }}
              register={register}
              type="tel"
              placeholder="Phone Number"
              label="Phone Number"
              name="phone"
              errors={errors}
            />
          </div>
          <div className="relative mt-6">
            <Inputs
              validation={{
                required: 'This is required',
                validate: (value: string) => passwordValidator(value),
              }}
              register={register}
              type="password"
              placeholder="Password"
              label="Password"
              name="password"
              errors={errors}
            />
            {password && !passwordValidator(password) && (
              <span className="text-xs text-red-500 ">
                Must include at least 1 upper case 1 special character min of 8
                in length
              </span>
            )}
          </div>

          <div className="mt-6">
            <Inputs
              validation={{
                required: 'This is required',
                validate: (value: string) =>
                  value === password || 'The passwords do not match',
              }}
              register={register}
              type="password"
              placeholder="Confirm passowrd"
              label="Confirm password"
              name="password2"
              errors={errors}
            />
          </div>
          <div className="flex mt-8 space-x-1">
            <input type="checkbox" {...register('terms', { required: true })} />
            <p className="text-xs text-links">
              By signing up I agree that I’m 18 years of age or older, to the
              <span className="mx-2 font-semibold text-black">
                User Agreements, Privacy Policy, Cookie Policy, E-Sign Consent.
              </span>
            </p>
          </div>

          {/* login button */}
          <div className="mt-6">
            <button
              disabled={isLoading}
              className="w-full p-2 font-semibold tracking-wide text-center text-white bg-primary rounded-lg shadow-lg lg:p-4 hover:opacity-75 font-display focus:outline-none focus:shadow-outline hover:bg-blue-600"
            >
              {isLoading ? (
                <div className="flex items-center justify-center w-full">
                  <Loader
                    type="ThreeDots"
                    color="#fff"
                    height={30}
                    width={60}
                  />
                </div>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>
        <Toaster />
      </FormLayout>
    </AuthLayout>
  );
};

export default Signuppage;
