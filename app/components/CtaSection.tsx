"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { EASE } from "./hero/motion";

const STAGE_WIDTH = 1440;
const CARD_WIDTH = 1240;

const HEADLINE_GRADIENT =
  "radial-gradient(130% 150% at 50% 50%, #ff6f00 2%, #ff771e 9%, #ff7f1d 14%, #ff903a 27%, #ffa056 39%, #ffb073 51%, #ffd1ad 76%, #fff1e6 100%)";

const WA_NUMBER = "6282113788471";

const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  [
    "Halo Ranovate,",
    "",
    "Saya tertarik untuk konsultasi gratis mengenai kebutuhan digital bisnis saya.",
    "",
    "Boleh dibantu untuk diskusi lebih lanjut? Terima kasih.",
  ].join("\n"),
)}`;

type CtaSectionProps = {
  titleLead?: string;
  titleAccent?: string;
  titleWidth?: number;
  subtitle?: string;
  ctaLabel?: string;
};

export default function CtaSection({
  titleLead = "Waktunya bisnis Anda ",
  titleAccent = "melangkah lebih jauh",
  titleWidth = 634,
  subtitle = "Mulai dari konsultasi gratis. Kami pelajari bisnis Anda dan pastikan solusinya benar-benar sesuai sebelum apa pun dibangun.",
  ctaLabel = "Mulai Konsultasi Gratis",
}: CtaSectionProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(560);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const update = () => {
      const next = wrapper.offsetWidth / STAGE_WIDTH;
      setScale(next);
      setHeight(inner.offsetHeight * next);
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

  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.3 } as const;

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start end", "end start"] });
  const figureY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [56, -56]);
  const gridY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30]);

  const card: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.6 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
      };
  const figureReveal: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }
    : {
        hidden: { opacity: 0, x: 80, scale: 1.05 },
        show: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.1, ease: EASE, delay: 0.5 } },
      };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div ref={wrapperRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col items-center gap-[40px] px-[100px] pb-[60px] pt-[160px]"
          style={{ width: STAGE_WIDTH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          <div className="relative" style={{ width: CARD_WIDTH }}>
            <motion.div
              className="relative flex flex-col items-start gap-[24px] overflow-hidden rounded-[32px] p-[60px]"
              style={{ border: "1px solid #424345" }}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <div className="pointer-events-none absolute" style={{ left: -601, top: -491, width: 2034, height: 1317.705 }}>
                <div className="absolute inset-[-11.33%_0_-11.33%_-7.24%]">
                  <Image src="/images/cta/glow.svg" alt="" fill sizes="2200px" className="object-fill" />
                </div>
              </div>
              <div
                className="pointer-events-none absolute"
                style={{ left: "calc(50% + 311px)", top: "calc(50% + 35px)", transform: "translate(-50%, -50%)" }}
              >
                <motion.div className="relative" style={{ width: 1488, height: 1488, y: gridY }}>
                  <Image src="/images/cta/grid.svg" alt="" fill sizes="1488px" className="object-fill" />
                </motion.div>
              </div>
              <div
                className="pointer-events-none absolute"
                style={{ left: "calc(50% + 312px)", top: "calc(50% + 35px)", transform: "translate(-50%, -50%)" }}
              >
                <div className="absolute" style={{ left: 0, top: 0, width: 865, height: 76, backgroundColor: "#9e1515", filter: "blur(100px)" }} />
                <div className="absolute" style={{ left: 121, top: 19, width: 623, height: 38, backgroundColor: "#9e1515", filter: "blur(80px)" }} />
                <div className="absolute" style={{ left: 164, top: 19, width: 537, height: 38, backgroundColor: "#9e1515", filter: "blur(25px)" }} />
              </div>

              {!reduce && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 z-[8]"
                  style={{ backgroundColor: "#0a0a0a" }}
                  initial={{ x: "0%" }}
                  whileInView={{ x: "102%" }}
                  viewport={viewport}
                  transition={{ duration: 1.05, ease: EASE, delay: 0.1 }}
                >
                  <div
                    className="absolute right-0 top-0 h-full w-[3px]"
                    style={{ background: "linear-gradient(180deg, rgba(255,176,128,0.9), #9e1515)", boxShadow: "0 0 30px 6px rgba(158,21,21,0.8)" }}
                  />
                </motion.div>
              )}

              <motion.div className="relative flex w-[719px] flex-col items-start gap-[8px] text-white" variants={item}>
                <h2
                  className="text-[48px] leading-[1.2]"
                  style={{ width: titleWidth, fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 600, letterSpacing: "-0.25px" }}
                >
                  {titleLead}
                  <span
                    style={{
                      backgroundImage: HEADLINE_GRADIENT,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {titleAccent}
                  </span>
                </h2>
                <p
                  className="w-[619px] text-[20px] font-light leading-[1.5]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {subtitle}
                </p>
              </motion.div>

              <motion.div className="relative flex gap-[12px]" variants={item}>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-center gap-[8px] overflow-hidden rounded-[12px] px-[16px] py-[14px] transition-[filter] duration-200 hover:brightness-110"
                  style={{ backgroundColor: "#9e1515" }}
                >
                  <div className="relative size-[16px]">
                    <Image src="/images/cta/wa.svg" alt="" fill sizes="16px" />
                  </div>
                  <span
                    className="whitespace-nowrap text-[16px] font-semibold leading-[20px] text-white"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {ctaLabel}
                  </span>
                </a>
              </motion.div>

              {!reduce && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[6]"
                  style={{
                    background:
                      "linear-gradient(100deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 60%)",
                  }}
                  initial={{ x: "-120%" }}
                  whileInView={{ x: "120%" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
                />
              )}
            </motion.div>

            <motion.div
              className="pointer-events-none absolute overflow-hidden"
              style={{ left: 0, right: 0, top: -150, bottom: 0, borderRadius: "0 0 32px 32px" }}
              variants={figureReveal}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <motion.div className="absolute" style={{ right: -70, bottom: -8, width: 462, height: 490, y: figureY }}>
                <Image src="/images/cta/figure.png" alt="" fill sizes="462px" className="object-contain object-bottom" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
