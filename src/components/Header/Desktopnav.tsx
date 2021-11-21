import React, { FC } from "react";
import { navItems } from "../../data";
import Link from "next/link";

interface Props {}

const Desktopnav: FC = () => {
  return (
    <ul className="flex items-center lg:space-x-2 xl:space-x-10">
      {navItems.map((item, idx) => (
        <li
          key={idx}
          className="lg:text-md xl:text-lg text-links font-poppins hover:text-primary "
        >
          <Link href={item.link}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Desktopnav;
