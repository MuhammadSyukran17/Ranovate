"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE, EASE_BACK } from "../hero/motion";

const STAGE_WIDTH = 1440;

const VIEWPORT = { once: true, amount: 0.2 } as const;

const HEADING_GRADIENT =
  "radial-gradient(60% 130% at 50% 50%, #ff9710 2%, #ffb14c 39%, #ffe5c3 75%, #ffffff 100%)";

const OVERLAY = "rgba(74,9,9,0.4)";

const GLASS: CSSProperties = {
  backgroundColor: "rgba(10,10,12,0.5)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
};

const IMAGE_FRAME: CSSProperties = {
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
};

type Stat = { icon: string; label: string; value: string };

const STATS: Stat[] = [
  { icon: "/images/about/icons/client.svg", label: "Client", value: "100+ Business" },
  { icon: "/images/about/icons/satisfaction.svg", label: "Kepuasan", value: "100% Client Satisfaction" },
  { icon: "/images/about/icons/reviews.svg", label: "Reviews", value: "100+ Positive Reviews" },
];

function GalleryImage({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[12px] ${className ?? ""}`} style={{ backgroundColor: "#0a0a0a" }}>
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 600px, 90vw" loading="lazy" className="object-cover opacity-80" />
      <div className="absolute inset-0" style={{ backgroundColor: OVERLAY }} />
      <div className="absolute inset-0 rounded-[12px]" style={IMAGE_FRAME} />
    </div>
  );
}

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

  const galleryContainer: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.1 } } };
  const galleryItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 40, scale: 0.94, filter: "blur(12px)" },
        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
      };
  const statItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 24, scale: 0.9 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_BACK } },
      };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div ref={wrapperRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col items-center gap-[64px] px-[100px] pb-[80px] pt-[140px]"
          style={{ width: STAGE_WIDTH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          {/* Red beam glow + grid behind the title (figma gradient background) */}
          <div aria-hidden className="pointer-events-none absolute" style={{ left: 720, top: 238, zIndex: 0 }}>
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 1100,
                height: 440,
                opacity: 0.45,
                maskImage: "radial-gradient(54% 56% at 50% 50%, #000 0%, transparent 72%)",
                WebkitMaskImage: "radial-gradient(54% 56% at 50% 50%, #000 0%, transparent 72%)",
              }}
            >
              <Image src="/images/cta/grid.svg" alt="" fill sizes="1100px" className="object-cover" />
            </div>
            <div className="absolute" style={{ width: 900, height: 80, left: -450, top: -40, backgroundColor: "#9e1515", filter: "blur(110px)" }} />
            <div className="absolute" style={{ width: 640, height: 40, left: -320, top: -20, backgroundColor: "#9e1515", filter: "blur(80px)" }} />
            <div className="absolute" style={{ width: 450, height: 26, left: -225, top: -13, backgroundColor: "#c81e1e", filter: "blur(20px)" }} />
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
              className="w-full text-center text-[18px] font-light leading-[1.5]"
              style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Dua kata yang lahir menjadi satu nama, dan satu komitmen yang tidak pernah kami pisahkan: membarui
              cara bisnis bekerja dengan inovasi yang benar-benar bisa diandalkan.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative z-[1] flex h-[554px] w-full items-start gap-[16px]"
            variants={galleryContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className="flex h-full w-[456px] flex-col gap-[16px]">
              <motion.div variants={galleryItem} className="h-[351px] w-full rounded-[32px] p-[20px]" style={GLASS}>
                <GalleryImage src="/images/about/g1.webp" className="h-full w-full" />
              </motion.div>
              <motion.div variants={galleryItem} className="min-h-px w-full flex-1 rounded-[32px] p-[20px]" style={GLASS}>
                <GalleryImage src="/images/about/g2.webp" className="h-full w-full" />
              </motion.div>
            </div>

            <div className="flex h-full min-w-px flex-1 flex-col gap-[16px]">
              <div className="flex h-[204.5px] items-center gap-[16px]">
                <motion.div variants={galleryItem} className="h-[196.5px] w-[561px] shrink-0 rounded-[32px] p-[20px]" style={GLASS}>
                  <GalleryImage src="/images/about/g3.webp" className="h-full w-full" />
                </motion.div>
                <motion.div variants={galleryItem} className="h-[204.5px] min-w-px flex-1 rounded-[32px] p-[20px]" style={GLASS}>
                  <GalleryImage src="/images/about/g4.webp" className="h-full w-full" />
                </motion.div>
              </div>

              <div className="flex h-[204.5px] items-center gap-[16px]">
                <motion.div variants={galleryItem} className="h-[196.5px] w-[295px] shrink-0 rounded-[32px] p-[20px]" style={GLASS}>
                  <GalleryImage src="/images/about/g5.webp" className="h-full w-full" />
                </motion.div>
                <motion.div variants={galleryItem} className="h-[196.5px] min-w-px flex-1 rounded-[32px] p-[20px]" style={GLASS}>
                  <GalleryImage src="/images/about/g6.webp" className="h-full w-full" />
                </motion.div>
              </div>

              <div className="flex h-[113px] w-full shrink-0 gap-[16px]">
                {STATS.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={statItem}
                    className="flex h-full min-w-px flex-1 items-center gap-[16px] overflow-clip rounded-[12px] p-[16px]"
                    style={{
                      backgroundColor: "rgba(10,10,10,0.2)",
                      backdropFilter: "blur(18px)",
                      WebkitBackdropFilter: "blur(18px)",
                      border: "1px solid #232426",
                    }}
                  >
                    <span
                      className="flex size-[32px] shrink-0 items-center justify-center rounded-[8px] p-[8px]"
                      style={{ backgroundColor: "#420909" }}
                    >
                      <span className="relative block size-[20px]">
                        <Image src={stat.icon} alt="" fill sizes="20px" />
                      </span>
                    </span>
                    <span className="flex flex-col gap-[4px]">
                      <span
                        className="text-[14px] font-medium leading-[1.5]"
                        style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {stat.label}
                      </span>
                      <span
                        className="text-[20px] font-bold leading-[1.4] text-white"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {stat.value}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
