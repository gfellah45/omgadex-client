import React, { useRef } from "react";
import Container from "../shared/Container";
import ServiceCard from "./ServiceCard";
import { service } from "../../data";
import { Reveal, Tween } from "react-gsap";
import FadeLeft from "../AnimationContainer/FadeLeft";
import FadeIn from "../AnimationContainer/FadeIn";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

const DoMore = (): JSX.Element => {
  gsap.registerPlugin(ScrollTrigger);
  return (
    <div className="pb-8 mt-32">
      <Container>
        <Reveal trigger={<div />}>
          <FadeLeft>
            <h2 className="text-5xl font-bold text-center md:text-5xl">
              Do more with Omega DEX
            </h2>
          </FadeLeft>
        </Reveal>
        <Reveal trigger={<p />}>
          <FadeIn delay={0.8}>
            <p className="w-11/12 mx-auto mt-6 text-xs leading-6 text-center md:w-7/12 lg:text-sm xl:text-lg text-links">
              Promoting the culture of wealth building in African communities,
              by Africans and for Africans. With the service of our savvy
              professionals, choose and invest in plans that future you would
              thank you for all
            </p>
          </FadeIn>
        </Reveal>

        <div className="hidden grid-cols-2 lg:grid lg:grid-cols-3 lg:gap-0 xl:gap-4 lg:mt-16 xl:mt-28">
          <Tween
            stagger={0.2}
            from={{ y: "500px", opacity: "0", delay: "0.9" }}
            ease="back.out(1.4)"
            to={{
              y: "0px",
              opacity: "1",
              delay: "0.9",
              scrollTrigger: {
                trigger: ".square",
                start: "-200px center",
                end: "200px center",
                scrub: 0.5,
              },
            }}
          >
            {service.slice(0, 3).map((item, index) => (
              <ServiceCard
                key={index}
                title={item.title}
                description={item.text}
              />
            ))}
          </Tween>
        </div>

        <div className="hidden grid-cols-3 gap-4 mt-4 lg:grid">
          {service.slice(0, 3).map((item, index) => (
            <div key={index} className="h-[1px] bg-omgray"></div>
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
