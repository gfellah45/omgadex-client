import React from "react";
import Image from "next/image";
import AppModal from "../../../modals";
import { hideModal, showModal } from "../../../reducers/ui";
import { useDispatch } from "react-redux";
import Close from "../../../assets/svg/Close";

function ProfileTab() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="h-full">
        <header className=" flex w-[80%] justify-between items-center">
          <div className="flex items-center gap-8">
            <Image
              src="/assets/user.svg"
              onClick={() => {
                dispatch(showModal({ showModal: true }));
              }}
              alt="user"
              width={"100%"}
              height={"100%"}
            />
            <div>
              <p className="text-[1.6rem] font-[500]">David Johnson</p>
              <p className="text-neutral-500 font-[500]">schinner@ui8.net</p>
            </div>
          </div>
          <div>
            <button className="py-1 font-semibold px-4 rounded-full text-sm border-2 text-purple-500">
              Unverified
            </button>
          </div>
        </header>

        <form className="md:w-[90%]">
          <div className="mt-4 flex justify-between flex-wrap items-center">
            <div className="w-full md:w-5/12">
              <label className="text-gray-400 text-xs" htmlFor="firstName">
                Firstname
              </label>
              <div className="my-3 border rounded-xl">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
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
                  name="lastname"
                  id="lastname"
                  className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
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
                  name="email"
                  id="email"
                  className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
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
                  type="text"
                  name="phone"
                  id="phone"
                  className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
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
    </>
  );
}

export default ProfileTab;
