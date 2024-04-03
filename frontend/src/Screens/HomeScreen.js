import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeScreen = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 0.7,
        delay: 0.3,
      })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
        });
    }, comp);
    return () => ctx.revert();
  }, []);
  return (
    <div className="relative" ref={comp}>
      <div
        className="h-screen p-[5vw] bg-[#DBDFE1] absolute top-0 left-0 font-serif z-10 w-full flex flex-col tracking-tight leading-tight"
        id="intro-slider"
      >
        <h1 className="text-[7vw]" id="title-1">
          Welcome
        </h1>
        <h1 className="text-[7vw]" id="title-2">
          To
        </h1>
        <h1 className="text-[7vw]" id="title-3">
          SkillShare
        </h1>
      </div>
      <div className="flex h-screen bg-[#D0D8DC] justify-center place-items-center ">
        <h1
          className="text-[10vw] font-bold text-black font-serif "
          id="welcome"
        >
          SkillShare
        </h1>
      </div>
    </div>
  );
};

export default HomeScreen;
