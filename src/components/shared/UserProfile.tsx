import React, { FC, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import NotifIcon from "../../assets/svg/NotifIcon";
import Image from "next/image";
import CarretDown from "../../assets/svg/CarretDown";
import { Menu, Transition, Switch } from "@headlessui/react";
import Profile from "../../assets/svg/Profile";
import Settings from "../../assets/svg/Settings";
import Logout from "../../assets/svg/Logout";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";
import { useRouter } from "next/router";
import { logout } from "../../reducers/auth";
import Switcher from "./Switcher";

const UserProfile: FC = () => {
  const user = useAppSelector(({ auth }) => auth.user);

  const { push } = useRouter();

  const dispatch = useAppDispatch();
  const logUserOut = () => {
    sessionStorage.clear();

    // dispatch(clearUserInfo());
    dispatch(logout());

    push("/login");
  };

  return (
    <div className="flex items-center space-x-6 dark:bg-black ">
      <Switcher />
      <div>
        <button className="flex items-center space-x-2">
          <span className="text-sm lg:text-sm">{"EN"}</span> <FaCaretDown />
        </button>
      </div>

      <div className="">
        <NotifIcon />
      </div>

      <div className="w-10 h-10 overflow-hidden rounded-full">
        <Image
          src="/assets/user.svg"
          alt="user"
          width={"100%"}
          height={"100%"}
        />
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <div className="cursor-pointer">
          <Menu.Button className="flex items-center space-x-2">
            <span className="text-sm lg:text-sm">{user.firstName}</span>{" "}
            <CarretDown />
          </Menu.Button>
        </div>

        <Transition
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-48 py-4 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-2 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-50 shadow-sm " : "text-gray-900"
                    } group flex space-x-4  items-center w-full px-4 rounded  py-2 text-base`}
                  >
                    <Profile />
                    <div>My Acount</div>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-50 shadow-sm " : "text-gray-900"
                    } group flex space-x-4  items-center w-full px-4 rounded  py-2 text-base`}
                  >
                    <Settings />
                    <div>Settings</div>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => logUserOut()}
                    className={`${
                      active ? "bg-gray-50 shadow-sm " : "text-gray-900"
                    } group flex space-x-4  items-center w-full px-4 rounded  py-2 text-base`}
                  >
                    <Logout />
                    <div>Logout</div>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserProfile;
