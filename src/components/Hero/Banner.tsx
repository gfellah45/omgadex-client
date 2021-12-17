import React from "react";
import Container from "../shared/Container";
import { FilledButtons } from "../shared/Buttons";
import Image from "next/image";
import person from "../../assets/images/manImage.png";
import CurrencyCard from "./CurrencyCard";
import { rates } from "../../data";
import { Tween } from "react-gsap";

interface Props {}

const Banner = (props: Props) => {
  return (
    <div>
      <Container>
        <div className="flex h-[476px] flex-wrap bg-pattern bg-no-repeat bg-auto bg-left">
          <div className="bg-red.500 lg:w-4/12 xl:w-6/12 h-full flex justify-center items-center">
            <div className=" lg:pl-8 xl:pl-40">
              <Tween
                from={{ y: "200px" }}
                stagger={0.2}
                ease="elastic.out(0.1, 0.1)"
              >
                <h1 className="h-48 overflow-y-hidden text-6xl font-bold text-center md:8xl lg:text-left lg:text-5xl xl:text-8xl">
                  Exchange Made Easy
                </h1>
              </Tween>
              <Tween
                from={{ y: "200px", delay: 0.2 }}
                stagger={0.2}
                ease="elastic.out(0.1, 0.1)"
              >
                <p className="mt-3 text-sm leading-5 tracking-widest text-center lg:text-left lg:text-xs lg:w-11/12 xl:w-10/12 text-links">
                  Invest like an expert. Build wealth and secure with Real
                  Estate | Stocks | NFTs | Cryptocurrencies | Insurrances
                </p>
              </Tween>
              <Tween
                from={{ y: "200px", delay: 0.4 }}
                stagger={0.2}
                ease="elastic.out(0.1, 0.1)"
              >
                <div className="w-8/12 mx-auto mt-12 text-center lg:w-5/12 lg:mx-0 lg:text-left">
                  <FilledButtons text="Get Started Now" />
                  {/* <button className="w-7/12 px-8 py-2 text-white rounded-md shadow-md bg-primary">
                    Get Started Now
                  </button> */}
                </div>
              </Tween>
            </div>
          </div>
          <Tween
            from={{ x: "1000px", delay: 0.6 }}
            stagger={0.2}
            ease="elastic.out(0.1, 0.1)"
          >
            <div className="hidden h-full overflow-y-hidden bg-left-top bg-no-repeat lg:w-8/12 xl:w-6/12 lg:block ">
              <Image src={person} alt="banner image" />
            </div>
          </Tween>
        </div>
        <Tween
          from={{ y: "800px", delay: 0.7 }}
          stagger={0.1}
          ease="elastic.out(0.1, 0.1)"
        >
          <div className="grid grid-cols-2 gap-2 px-2 py-2 rounded-lg shadow-xl lg:px-4 lg:gap-8 lg:grid-cols-4 lg:py-2 xl:py-6 bg-omgray">
            {rates.map((rate, idx) => (
              <CurrencyCard
                key={idx}
                amount={rate.amount}
                exchange={rate.exchage}
                subAmount={rate.oldAmount}
                currency={rate.currency}
                percentage={rate.percentage}
              />
            ))}
          </div>
        </Tween>
      </Container>
    </div>
  );
};

export default Banner;
