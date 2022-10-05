// @ts-nocheck
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import AppModal from "../../../modals";
import { hideModal, showModal } from "../../../reducers/ui";
import { useDispatch } from "react-redux";
import Close from "../../../assets/svg/Close";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../../../services/settings";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

let AccountUpdatedSuccessfullyRes = {
  message: "success",
  payload: {
    loginToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIyMTI3Y2QyMDNlMGI1ZGE0N2MwMjMiLCJlbWFpbCI6ImFsYW5kNjIwOUBnbWFpbC5jb20iLCJpc3MiOiJEb2xhd2F5IHRlY2giLCJpYXQiOjE2NTQxNzA1NzEsImV4cCI6MTY1NDI1Njk3MX0.3H-sGCDDuZ62QYYmk0_j4LrB9dQF6v81tyWNCUIzWXg",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIyMTI3Y2QyMDNlMGI1ZGE0N2MwMjMiLCJpc3MiOiJEb2xhd2F5IHRlY2giLCJpYXQiOjE2NTQxNzA1NzF9.XFL92PDdBBsEFvVB6dzPrLU9vtXMy32HqJOYAxd91Ow",
    user: {
      _id: "6222127cd203e0b5da47c023",
      email: "aland6209@gmail.com",
      firstName: "Alan",
      lastName: "Douglas",
      isAdmin: true,
      phone: "08133814442",
      enable2fa: true,
      address: "0x465f1c46F713F6b8580A124B8fd4C8c09A96953B",
    },
  },
};

interface userResponseInterface {
  createdAt: string;
  email: string;
  firstName: string;
  isActivated: boolean;
  lastName: string;
  phone: string;
  updatedAt: string;
  _id: string;
}

export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

function ProfileTab() {
  const dispatch = useDispatch();
  const [updateUserInfo] = useUpdateUserProfileMutation();
  const [userData, setUserData] = useState<userResponseInterface>({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    isActivated: false,
    createdAt: "",
    updatedAt: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: userProfileDetails, isLoading } = useGetUserProfileQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    let modifiedState: any = () => ({
      ...userData,
      [name]: value,
    });
    setUserData(modifiedState);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateUserInfo(data)
      .unwrap()
      .then((res: any) => {
        toast.success("Profile updated successful");
      })
      .catch((err: any) => console.error("something went wrong", err));
  };

  useEffect(() => {
    setUserData(userProfileDetails?.payload);
  }, [userProfileDetails?.payload]);

  return (
    <>
      <div className="h-full mb-28 md:mb-0">
        <header className="flex md:w-[80%] justify-between flex-wrap items-center">
          <div className="flex items-center  gap-8">
            <Image
              src="/assets/user.svg"
              onClick={() => {
                dispatch(showModal({ showModal: true }));
              }}
              alt="user"
              width={"100%"}
              height={"100%"}
              className="w-full h-full"
            />
            <div>
              <p className="text-[1.6rem] font-[500]">
                {userData?.firstName} {userData?.lastName}
              </p>
              <p className="text-neutral-500 font-[500]">{userData?.email}</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 mx-auto md:mx-0">
            <button className="py-1 font-semibold px-4 rounded-full text-sm border-2 text-purple-500">
              {userData?.isActivated ? "Verified" : "Unverified"}
            </button>
          </div>
        </header>
        <form className="md:w-[90%]" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex justify-between flex-wrap items-center">
            <div className="w-full md:w-5/12">
              <label className="text-gray-400 text-xs" htmlFor="firstName">
                Firstname
              </label>
              <div className="my-3 border rounded-xl">
                <input
                  type="text"
                  id="firstName"
                  value={userData?.firstName}
                  {...register("firstName")}
                  onChange={handleFieldChange}
                  className="w-full py-3 px-1 rounded-xl text-gray-400 focus:outline-none placeholder:text-sm"
                  placeholder="David"
                />
              </div>
            </div>
            <div className="w-full md:w-5/12">
              <label className="text-gray-400 text-xs" htmlFor="lastname">
                Lastname
              </label>
              <div className="my-3 border rounded-xl">
                <input
                  type="text"
                  {...register("lastName")}
                  onChange={handleFieldChange}
                  id="lastname"
                  // defaultValue={userData?.lastName}
                  value={userData?.lastName}
                  className="w-full py-3 text-gray-400 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                  placeholder="Johnson"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between flex-wrap items-center">
            <div className="w-full md:w-5/12">
              <label className="text-gray-400 text-xs" htmlFor="email">
                Email
              </label>
              <div className="my-3 border rounded-xl">
                <input
                  type="email"
                  {...register("email")}
                  onChange={handleFieldChange}
                  id="email"
                  value={userData?.email}
                  className="w-full py-3 px-1 text-gray-400 rounded-xl focus:outline-none placeholder:text-sm"
                  placeholder="David.johnson@gmail.com"
                />
              </div>
            </div>
            <div className="w-full md:w-5/12">
              <label className="text-gray-400 text-xs" htmlFor="phone">
                Phone Number
              </label>
              <div className="my-3 border rounded-xl">
                <input
                  type="tel"
                  {...register("phone")}
                  id="phone"
                  value={userData?.phone}
                  onChange={handleFieldChange}
                  className="w-full py-3 px-1 text-gray-400 rounded-xl focus:outline-none placeholder:text-sm"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>
          </div>

          <div className="my-4 flex justify-between items-center">
            <button className="bg-primary text-white rounded-full px-3 py-2 space-x-3  cursor-pointer flex items-center justify-between ">
              Save Settings
            </button>
          </div>
        </form>
      </div>
      <AppModal>
        <div>
          <div>
            <p className="text-2xl mt-4  text-center font-bold">Change Profile Photo</p>
          </div>
          <div
            onClick={() => dispatch(hideModal())}
            className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-6"
          >
            <Close />
          </div>

          <div className="text-center">
            <p className="py-5 border-b-[1px] w-[70%] cursor-pointer  mx-auto">Upload Photo</p>
            <p className="py-5 text-red-600 border-b-[1px] cursor-pointer mx-auto w-[70%]">
              Delete Current Photo
            </p>
            <p onClick={() => dispatch(hideModal())} className="py-5 cursor-pointer">
              Cancel
            </p>
          </div>
        </div>
      </AppModal>
      <Toaster />
    </>
  );
}

export default ProfileTab;
