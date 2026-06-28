"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE } from "../hero/motion";

const STAGE_WIDTH = 1440;

const VIEWPORT = { once: true, amount: 0.2 } as const;

const HEADING_GRADIENT =
  "radial-gradient(60% 130% at 50% 50%, #ff9710 2%, #ffb14c 39%, #ffe5c3 75%, #ffffff 100%)";

export default function AboutIntroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const update = () => {
      const nextScale = wrapper.offsetWidth / STAGE_WIDTH;
      setScale(nextScale);
      setHeight(inner.offsetHeight * nextScale);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    observer.observe(inner);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const fade: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.45 } } };

  const headerContainer: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } };
  const headerItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
      };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div ref={wrapperRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col items-center px-[100px] pb-[16px] pt-[128px]"
          style={{ width: STAGE_WIDTH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          <div aria-hidden className="pointer-events-none absolute" style={{ left: 720, top: 206, zIndex: 0 }}>
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 880,
                height: 260,
                opacity: 0.4,
                maskImage: "radial-gradient(54% 56% at 50% 50%, #000 0%, transparent 72%)",
                WebkitMaskImage: "radial-gradient(54% 56% at 50% 50%, #000 0%, transparent 72%)",
              }}
            >
              <Image src="/images/cta/grid.svg" alt="" fill sizes="880px" className="object-cover" />
            </div>
            <div className="absolute" style={{ width: 720, height: 50, left: -360, top: -25, backgroundColor: "#9e1515", filter: "blur(90px)" }} />
            <div className="absolute" style={{ width: 480, height: 28, left: -240, top: -14, backgroundColor: "#c81e1e", filter: "blur(40px)" }} />
          </div>

          <motion.div
            className="relative z-[1] flex w-full flex-col items-center gap-[24px]"
            variants={headerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div
              variants={reduce ? fade : headerItem}
              className="flex items-center gap-[6px] rounded-[16px] p-[8px]"
              style={{ backgroundColor: "#0a0a0a", border: "1px solid #232426" }}
            >
              <span className="flex items-center rounded-[8px] p-[4px]" style={{ backgroundColor: "#9e1515" }}>
                <span className="relative block size-[16px]">
                  <Image src="/images/about/icons/badge.svg" alt="" fill sizes="16px" />
                </span>
              </span>
              <span
                className="text-[16px] font-normal leading-[1.4]"
                style={{ color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Renew and Inovate
              </span>
            </motion.div>

            <motion.h1
              variants={reduce ? fade : headerItem}
              className="w-full text-center text-[52px] leading-[1.3] text-white"
              style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 600, letterSpacing: "-0.25px" }}
            >
              Kenalan dengan{" "}
              <span
                style={{
                  backgroundImage: HEADING_GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Ranovate
              </span>
            </motion.h1>

            <motion.p
              variants={reduce ? fade : headerItem}
              className="w-full max-w-[760px] text-center text-[18px] font-light leading-[1.5]"
              style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Dua kata yang lahir menjadi satu nama, dan satu komitmen yang tidak pernah kami pisahkan: membarui
              cara bisnis bekerja dengan inovasi yang benar-benar bisa diandalkan.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
