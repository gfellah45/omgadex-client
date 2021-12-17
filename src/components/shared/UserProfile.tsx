import React, { FC } from "react";
import { FaCaretDown } from "react-icons/fa";
import NotifIcon from "../../assets/svg/NotifIcon";
import Image from "next/image";
import CarretDown from "../../assets/svg/CarretDown";

const UserProfile: FC = () => {
  return (
    <div className="flex items-center space-x-6 ">
      <div>
        <button className="flex items-center space-x-2">
          <span className="text-sm lg:text-sm">{"EN"}</span> <FaCaretDown />
        </button>
      </div>

      <div className="">
        <NotifIcon />
      </div>

      <div className="rounded-full overflow-hidden w-10 h-10">
        <Image
          src="/assets/user.svg"
          alt="user"
          width={"100%"}
          height={"100%"}
        />
      </div>

      <div>
        <button className="flex items-center space-x-1">
          <span className="text-sm lg:text-sm">{"David"}</span> <CarretDown />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
