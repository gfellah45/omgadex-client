import React from "react";
import Container from "../shared/Container";
import ServiceCard from "./ServiceCard";
import { service } from "../../data";

interface Props {}

const DoMore = (props: Props) => {
  return (
    <div className="pb-8 mt-32">
      <Container>
        <h2 className="text-4xl font-bold text-center md:text-5xl">
          Do more with Omega DEX
        </h2>
        <p className="w-11/12 mx-auto mt-6 text-xs leading-6 text-center md:w-7/12 lg:text-sm xl:text-lg text-links">
          Promoting the culture of wealth building in African communities, by
          Africans and for Africans. With the service of our savvy
          professionals, choose and invest in plans that future you would thank
          you for.
        </p>

        <div className="hidden grid-cols-2 lg:grid lg:grid-cols-3 lg:gap-0 xl:gap-4 lg:mt-16 xl:mt-28">
          {service.slice(0, 3).map((item, index) => (
            <ServiceCard
              key={index}
              title={item.title}
              description={item.text}
            />
          ))}
        </div>
        <div className="hidden grid-cols-3 gap-4 mt-4 lg:grid">
          {service.slice(0, 3).map((item, index) => (
            <div key={index} className="h-[1px] bg-devide"></div>
          ))}
        </div>
        <div className="hidden grid-cols-2 lg:grid lg:grid-cols-3 lg:gap-0 xl:gap-4 lg:mt-16 xl:mt-12">
          {service.slice(3, 6).map((item, index) => (
            <ServiceCard
              key={index}
              title={item.title}
              description={item.text}
            />
          ))}
        </div>

        {/* mobile */}
        <div className="grid grid-cols-2 gap-0 md:grid-cols-2 lg:hidden lg:grid-cols-3 lg:gap-0 xl:gap-4 lg:mt-16 xl:mt-28">
          {service.map((item, index) => (
            <ServiceCard
              key={index}
              title={item.title}
              description={item.text}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DoMore;
