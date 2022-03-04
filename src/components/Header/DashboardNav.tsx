import React from "react";
import Link from "next/link";

interface Props {}

const DashboardNav = (props: Props) => {
  return (
    <ul className="flex space-x-10 ">
      <li className="text-omgray3 text-sm font-semibold  cursor-pointer hover:text-primary">
        <Link href={"/home"}>
          <a className=" hover:text-primary ">Home</a>
        </Link>
      </li>
      <li className="text-omgray3 text-sm font-semibold  cursor-pointer hover:text-primary">
        <Link href={"/exhange"}>
          <a className=" hover:text-primary ">Exchange</a>
        </Link>
      </li>
      <li className="text-omgray3 text-sm font-semibold  cursor-pointer hover:text-primary">
        <Link href={"/redeem"}>
          <a className=" hover:text-primary ">Redeem Voucher</a>
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
