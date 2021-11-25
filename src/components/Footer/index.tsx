import React, { ReactElement } from "react";
import Container from "../shared/Container";
import logo from "../../../public/assets/logo.svg";
import Image from "next/image";
import Fb from "../../../public/assets/Line.svg";
import tw from "../../../public/assets/twitter.svg";
import ig from "../../../public/assets/instagram.svg";

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <>
      <div className="w-full py-2 lg:w-4/5 lg:py-14">
        <Container>
          <div className="grid grid-cols-2 gap-2 justify-items-center lg:grid-cols-4">
            <div className="flex mt-2">
              <div>
                <Image src={logo} alt="logo" />
              </div>

              <p className="mx-4 text-lg font-semibold lg:text-2xl font-poppins">
                omega Dex
              </p>
            </div>
            <div>
              <ul>
                <li className="my-4 font-semibold ">COMPANY</li>
                <li className="my-4 text-links">About Us</li>
                <li className="my-4 text-links">Privacy Policy</li>
                <li className="my-4 text-links">Terms of Service</li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="my-4 font-semibold ">PRODUCTS</li>
                <li className="my-4 text-links">Exchange</li>
                <li className="my-4 text-links">Omega Voucher</li>
                <li className="my-4 text-links">Real Estates</li>
              </ul>
            </div>
            <div>
              <ul>
                <li className="my-4 font-semibold ">COMMUNITY</li>
                <li className="my-4 text-links">Contact us</li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <div className="border-t border-links ">
        <Container>
          <div className="flex flex-col items-center justify-center py-4 lg:justify-between lg:flex-row">
            <p className="text-sm text-links">
              Copyright © 2021 Omega DEX. All rights reserved
            </p>

            <p className="flex items-center justify-between w-3/12 mt-4 lg:w-1/12 lg:mt-0">
              <Image src={Fb} alt="facebbok" />
              <Image src={tw} alt="twitter" />
              <Image src={ig} alt="instagam" />
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
