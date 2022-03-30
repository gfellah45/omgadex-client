import React, { FC, useState } from "react";
import AppModal from "../../../modals";
import { hideModal, showModal } from "../../../reducers/ui";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStoreHooks";
import Close from "../../../assets/svg/Close";
import Eye from "../../../assets/svg/Eye";
import ArrowBack from "../../../assets/svg/ArrowBack";
import GoogleAuth from "../../../assets/svg/GoogleAuth";
import Image from "next/image";
import CopyIcon from "../../../assets/svg/CopyIcon";

const PASSWORD_MODAL = "PASSWORD_MODAL";
const TWO_FA_MODAL = "TWO_FA_MODAL";

function Security() {
  const [twoFaModal, setTwoFaModal] = useState("start");
  const dispatch = useAppDispatch();

  const { modalType } = useAppSelector((state) => state.ui);
  return (
    <>
      <div className="w-full h-full">
        <div className="flex  items-center justify-between w-full py-6 mb-3 border-b">
          <div className="flex flex-col items-start">
            <p className="font-semibold">Login Password</p>
            <span className="text-neutral-500">You can change your current password.</span>
          </div>
          <div>
            <button
              onClick={() => dispatch(showModal({ showModal: true, modalType: PASSWORD_MODAL }))}
              className="bg-primary text-white rounded-full px-6 py-2 space-x-3  cursor-pointer flex items-center justify-between "
            >
              Change
            </button>
          </div>
        </div>
        <div className="flex  items-center justify-between w-full py-6 mb-3 border-b">
          <div className="flex flex-col items-start">
            <p className="font-semibold">2 Factor Authentication</p>
            <span className="text-neutral-500">Disabled</span>
          </div>
          <div>
            <button
              onClick={() => dispatch(showModal({ showModal: true, modalType: TWO_FA_MODAL }))}
              className="bg-primary text-white rounded-full px-6 py-2 space-x-3  cursor-pointer flex items-center justify-between "
            >
              Enable
            </button>
          </div>
        </div>
      </div>
      {/* Change Password modal */}
      {modalType === PASSWORD_MODAL && (
        <AppModal maxWidth="md">
          <div>
            <div>
              <h2 className="text-3xl mt-2  text-center font-bold">Change Password</h2>
            </div>
            <div
              onClick={() => dispatch(hideModal())}
              className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-6"
            >
              <Close />
            </div>

            <form className="md:w-[80%]  mx-auto">
              <div className="mt-4 flex justify-center flex-col items-center">
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Password"
                    />
                    <Eye />
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="password">
                    New Password
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="password"
                    />
                    <Eye />
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-wrap items-center">
                <div className="w-full">
                  <label className="text-gray-400 text-xs" htmlFor="password2">
                    Confirm New Password
                  </label>
                  <div className="my-3 flex justify-between items-center px-2 border rounded-xl">
                    <input
                      type="password"
                      name="password2"
                      id="password2"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="password"
                    />
                    <Eye />
                  </div>
                  <p className="text-sm text-neutral-500">
                    Use at least 8 characters, 1 number, 1 uppercase & 1 lowercase letter
                  </p>
                </div>
              </div>

              <div className="my-2 flex justify-between items-center">
                <button className="bg-primary text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer">
                  change Password
                </button>
              </div>
            </form>
          </div>
        </AppModal>
      )}
      {/* 2FA Modal */}
      {modalType === TWO_FA_MODAL && (
        <AppModal maxWidth="md">
          <>
            <div
              onClick={() => {
                dispatch(hideModal());
                setTwoFaModal("start");
              }}
              className="absolute right-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-l-lg cursor-pointer top-6"
            >
              <Close />
            </div>
            {twoFaModal === "start" && (
              <>
                <div>
                  <h2 className="text-3xl mt-2  text-center font-bold">2FA</h2>
                </div>

                <div>
                  <h2 className="font-bold">Enable 2FA</h2>
                  <p className="text-neutral-500 text-md">
                    Two-factor authentication keeps your wallet safer by using both your password
                    and an authentication app to sign in.
                  </p>
                  <p className="my-2 text-neutral-500 text-md">
                    Before you enable two factor authenticator please install the Google
                    Authenticator from playstore or appstore.
                  </p>

                  <div className="mx-auto text-center flex justify-center items-center">
                    <GoogleAuth />
                  </div>
                  <div>
                    <Image
                      src="/assets/images/appS.svg"
                      alt="app store it"
                      width={"70%"}
                      height={"100%"}
                    />
                    <Image src="/assets/images/googlePlay.png" alt="app " width="70" height="30" />
                  </div>
                  <div className="w-10/12 mx-auto">
                    <button
                      onClick={() => setTwoFaModal("middle")}
                      className="bg-primary text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </>
            )}
            {twoFaModal == "middle" && (
              <div>
                <div>
                  <h2 className="text-3xl mt-2  text-center font-bold">2FA</h2>
                </div>
                <div
                  onClick={() => {
                    setTwoFaModal("start");
                  }}
                  className="absolute left-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-r-lg cursor-pointer top-6"
                >
                  <ArrowBack />
                </div>
                <div>
                  <h2 className="font-bold text-xl mt-2">
                    2FA <span className="text-red-500">Disabled</span>
                  </h2>
                  <p className="text-neutral-500 text-md">
                    Copy the generated code and use it to setup your google authenticator or scan
                    the QR code.
                  </p>
                  <div className="w-8/12 border-2  flex justify-between items-center my-3 mx-auto">
                    <p className="text-blue-500 text-xl">XW25Y5XQKBL2FUUVUEMQ</p>

                    <CopyIcon />
                  </div>
                  <p className="text-sm font-bold text-center">OR</p>
                  <p className="text-sm text-neutral-500 font-normal text-center">Scan Code</p>

                  <div className="border-dotted radius-md h-32 w-32 border-[2px] mx-auto">
                    <Image
                      src="/assets/images/Barcode.png"
                      alt="Barcode"
                      width={"100%"}
                      height={"100%"}
                    />
                  </div>
                </div>
                <div className="w-8/12 my-3 mx-auto">
                  <button
                    onClick={() => setTwoFaModal("end")}
                    className="bg-primary text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {twoFaModal == "end" && (
              <div>
                <div>
                  <h2 className="text-3xl mt-2  text-center font-bold">2FA</h2>
                </div>
                <div
                  onClick={() => {
                    setTwoFaModal("middle");
                  }}
                  className="absolute left-0 flex items-center justify-center py-3 pl-6 pr-3 bg-gray-100 rounded-r-lg cursor-pointer top-6"
                >
                  <ArrowBack />
                </div>
                <div>
                  <h2 className="font-bold text-xl mt-2">
                    2FA <span className="text-red-500">Disabled</span>
                  </h2>
                  <p className=" mb-2 mt-2  text-md">
                    Enter the 6-digit code from your authentication app below to enable 2FA
                  </p>

                  <p className="text-sm w-8/12 mx-auto my-2 text-neutral-500 font-normal text-left">
                    Enter the code from your authenticator below
                  </p>
                  <div className="mb-3 flex w-8/12 mx-auto justify-between items-center px-2 border rounded-xl">
                    <input
                      type="text"
                      name="code"
                      id="code"
                      className="w-full py-3 px-1 rounded-xl focus:outline-none placeholder:text-sm"
                      placeholder="Enter Code"
                    />
                  </div>
                </div>
                <div className="w-8/12 mt-12 mb-3 mx-auto">
                  <button
                    onClick={() => setTwoFaModal("start")}
                    className="bg-primary text-center w-full text-white rounded-lg px-3 py-2 space-x-3  cursor-pointer"
                  >
                    Enabled 2FA
                  </button>
                </div>
              </div>
            )}
          </>
        </AppModal>
      )}
    </>
  );
}

export default Security;
