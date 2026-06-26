"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { EASE, EASE_BACK } from "./hero/motion";

const STAGE_WIDTH = 1440;
const STAGE_HEIGHT = 1178;

const HUB_X = 719;
const HUB_Y = 793;
const CARD_WIDTH = 468;
const CARD_HALF_HEIGHT = 57.5;
const EMANATE_FACTOR = 0.5;

type CardOffset = { dx: number; dy: number };

const CENTER_GRADIENT =
  "linear-gradient(180deg, #0a0a0a 0%, rgba(10,10,10,0) 10%, rgba(10,10,10,0.428) 80%, #0a0a0a 100%)";

const CARD_GLASS: CSSProperties = {
  backgroundColor: "rgba(20,20,20,0.55)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
};

const CARD_GLASS_LIGHT: CSSProperties = {
  backgroundColor: "rgba(20,20,20,0.32)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)",
};

const LINE_GLOW =
  "drop-shadow(0 0 2px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(255,120,90,0.7)) drop-shadow(0 0 14px rgba(158,21,21,0.55))";

type Principle = {
  title: string;
  description: string;
  icon: string;
  left: number;
  top: number;
  translucent?: boolean;
};

const PRINCIPLES: Principle[] = [
  {
    title: "Solusi yang Tepat Sasaran",
    description: "Setiap solusi dirancang khusus untuk menjawab masalah bisnis Anda yang sesungguhnya",
    icon: "/images/principles/icon-4.svg",
    left: 152,
    top: 377.4,
  },
  {
    title: "Investasi Kemajuan Bisnis Anda",
    description:
      "Setiap sistem yang kami bangun dirancang untuk membawa bisnis Anda melangkah lebih jauh, hari ini maupun ke depannya",
    icon: "/images/principles/icon-3.svg",
    left: 912,
    top: 401.4,
  },
  {
    title: "Hasil yang Terasa Nyata",
    description: "Anda melihat dan merasakan perubahannya langsung di operasional bisnis Anda sehari-hari",
    icon: "/images/principles/icon-1.svg",
    left: 61,
    top: 613.4,
  },
  {
    title: "Pendampingan Tanpa Batas",
    description: "Kami tidak pergi setelah selesai. Kami ada di setiap titik perjalanan bisnis Anda",
    icon: "/images/principles/icon-2.svg",
    left: 894,
    top: 613.4,
    translucent: true,
  },
];

type Line = {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  outerClass: string;
  innerClass: string;
  boxWidth: number;
  boxHeight: number;
  insetClass: string;
  viewBox: string;
  path: string;
  dir: 1 | -1;
  duration: number;
};

const LINES: Line[] = [
  {
    src: "/images/principles/line-1.svg",
    left: 202,
    top: 728,
    width: 315,
    height: 98,
    outerClass: "",
    innerClass: "rotate-90",
    boxWidth: 98,
    boxHeight: 315,
    insetClass: "inset-[-6.54%_-21.03%]",
    viewBox: "0 0 139.218 356.218",
    path: "M20.61 335.61 L110.61 335.61 Q118.61 335.61 118.61 327.61 L118.61 20.61",
    dir: -1,
    duration: 2.6,
  },
  {
    src: "/images/principles/line-2.svg",
    left: 917,
    top: 728,
    width: 256,
    height: 76,
    outerClass: "",
    innerClass: "-scale-y-100 rotate-90",
    boxWidth: 76,
    boxHeight: 256,
    insetClass: "inset-[-8.05%_-27.12%]",
    viewBox: "0 0 117.218 297.218",
    path: "M20.61 276.61 L88.61 276.61 Q96.61 276.61 96.61 268.61 L96.61 20.61",
    dir: -1,
    duration: 2.4,
  },
  {
    src: "/images/principles/line-3.svg",
    left: 763,
    top: 460,
    width: 149,
    height: 102,
    outerClass: "",
    innerClass: "-rotate-90 -scale-y-100",
    boxWidth: 102,
    boxHeight: 149,
    insetClass: "inset-[-13.83%_-20.2%]",
    viewBox: "0 0 143.218 190.218",
    path: "M20.61 169.61 L114.61 169.61 Q122.61 169.61 122.61 161.61 L122.61 20.61",
    dir: 1,
    duration: 2.2,
  },
  {
    src: "/images/principles/line-4.svg",
    left: 625,
    top: 435,
    width: 52,
    height: 127,
    outerClass: "",
    innerClass: "-rotate-90",
    boxWidth: 127,
    boxHeight: 52,
    insetClass: "inset-[-39.63%_-16.23%]",
    viewBox: "0 0 168.218 93.2181",
    path: "M20.61 72.61 L139.61 72.61 Q147.61 72.61 147.61 64.61 L147.61 20.61",
    dir: 1,
    duration: 2.8,
  },
];

function LinePulse({ viewBox, path, dir, duration, play }: {
  viewBox: string;
  path: string;
  dir: 1 | -1;
  duration: number;
  play: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, []);

  const segment = length * 0.14;

  return (
    <svg
      className="absolute inset-0 h-full w-full overflow-visible"
      style={{ contain: "paint", isolation: "isolate" }}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path ref={pathRef} d={path} stroke="none" />
      {play && length > 0 && (
        <motion.path
          d={path}
          stroke="#ffd9c2"
          strokeWidth={2}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 4px #ff3b1e) drop-shadow(0 0 9px #9e1515)" }}
          strokeDasharray={`${segment} ${length - segment}`}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -dir * length }}
          transition={{ duration, ease: "linear", repeat: Infinity }}
        />
      )}
    </svg>
  );
}

export default function PrinciplesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const inView = useInView(wrapperRef, { amount: 0.1 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScale(wrapper.offsetWidth / STAGE_WIDTH));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const reduce = useReducedMotion();
  const [cardsSettled, setCardsSettled] = useState(false);
  const viewport = { once: true, amount: 0.25 } as const;
  const fade: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };

  const headerContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.1 } },
  };
  const badgeItem: Variants = reduce
    ? fade
    : { hidden: { opacity: 0, scale: 0.82 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_BACK } } };
  const headingItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
      };

  const glowItem: Variants = reduce
    ? fade
    : { hidden: { opacity: 0, scale: 1.08 }, show: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: EASE } } };

  const linesContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 1.05 } },
  };
  const lineItem: Variants = reduce
    ? fade
    : { hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } } };

  const cardsContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: reduce ? 0 : 0.65 } },
  };
  const cardItem: Variants = reduce
    ? fade
    : {
        hidden: (offset: CardOffset) => ({ opacity: 0, scale: 0.66, x: offset.dx, y: offset.dy }),
        show: { opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 0.95, ease: EASE_BACK } },
      };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div ref={wrapperRef} className="relative w-full" style={{ height: STAGE_HEIGHT * scale }}>
        <motion.div
          className="absolute left-1/2 top-0 origin-top"
          style={{
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            transform: `translateX(-50%) scale(${scale})`,
          }}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div
            className="pointer-events-none absolute overflow-hidden"
            style={{ left: 0, top: 283, width: STAGE_WIDTH, height: 895 }}
            variants={glowItem}
          >
            <Image
              src="/images/principles/center-chip.webp"
              alt=""
              fill
              sizes="1440px"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundImage: CENTER_GRADIENT }} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute -scale-y-100"
            style={{ left: -607, bottom: -475.71, width: 2033.764, height: 1317.705 }}
            variants={glowItem}
          >
            <div className="absolute inset-[-11.33%_0_-11.33%_-7.24%]">
              <Image src="/images/principles/bg-glow.svg" alt="" fill sizes="2200px" className="object-fill" />
            </div>
          </motion.div>

          <motion.div
            className="absolute flex flex-col items-center gap-[40px]"
            style={{ left: 100, top: 64, width: 1240 }}
            variants={headerContainer}
          >
            <motion.div
              className="flex items-center gap-[6px] rounded-[16px] p-[8px]"
              style={{ backgroundColor: "#0a0a0a", border: "1px solid #232426" }}
              variants={badgeItem}
            >
              <div className="flex items-center rounded-[8px] p-[4px]" style={{ backgroundColor: "#9e1515" }}>
                <div className="relative size-[16px]">
                  <Image src="/images/principles/icon-badge.svg" alt="" fill sizes="16px" />
                </div>
              </div>
              <span
                className="text-[16px] font-normal leading-[1.4]"
                style={{ color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Prinsip Kami
              </span>
            </motion.div>

            <div className="flex w-full flex-col items-center gap-[24px]">
              <motion.h2
                className="w-full text-center text-[52px] text-white"
                style={{
                  fontFamily: "var(--font-host-grotesk), sans-serif",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  letterSpacing: "-0.25px",
                }}
                variants={headingItem}
              >
                Partner Transformasi untuk Kemajuan <span style={{ color: "#9e1515" }}>Bisnis Anda</span>
              </motion.h2>
              <motion.p
                className="w-full text-center text-[18px] font-normal leading-[1.5]"
                style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
                variants={headingItem}
              >
                Kami tidak sekadar membangun sistem digital, melainkan memastikan setiap solusi bekerja nyata
                mencapai target bisnis Anda
              </motion.p>
            </div>
          </motion.div>

          <motion.div className="pointer-events-none absolute inset-0" variants={linesContainer}>
            {LINES.map((line) => (
              <motion.div
                key={line.src}
                className={`absolute flex items-center justify-center ${line.outerClass}`}
                style={{ left: line.left, top: line.top, width: line.width, height: line.height }}
                variants={lineItem}
              >
                <div className={`flex-none ${line.innerClass}`}>
                  <div className="relative" style={{ width: line.boxWidth, height: line.boxHeight }}>
                    <div
                      className={`absolute ${line.insetClass}`}
                      style={{ filter: LINE_GLOW, transform: "translateZ(0)" }}
                    >
                      <Image
                        src={line.src}
                        alt=""
                        fill
                        sizes="360px"
                        className="object-fill"
                      />
                    </div>
                    <div className={`absolute ${line.insetClass}`}>
                      <LinePulse
                        viewBox={line.viewBox}
                        path={line.path}
                        dir={line.dir}
                        duration={line.duration}
                        play={inView && !reduce}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="absolute inset-0"
            variants={cardsContainer}
            onAnimationComplete={() => setCardsSettled(true)}
          >
            {PRINCIPLES.map((p) => {
              const glass = p.translucent ? CARD_GLASS_LIGHT : CARD_GLASS;
              const settledGlass = cardsSettled || reduce;
              const offset: CardOffset = {
                dx: (HUB_X - (p.left + CARD_WIDTH / 2)) * EMANATE_FACTOR,
                dy: (HUB_Y - (p.top + CARD_HALF_HEIGHT)) * EMANATE_FACTOR,
              };
              return (
              <motion.div
                key={p.title}
                className="absolute flex items-start gap-[20px] overflow-hidden rounded-[24px] p-[20px]"
                style={{
                  left: p.left,
                  top: p.top,
                  width: CARD_WIDTH,
                  transformPerspective: 1000,
                  ...glass,
                  ...(settledGlass
                    ? null
                    : { backdropFilter: "none", WebkitBackdropFilter: "none" }),
                }}
                variants={cardItem}
                custom={offset}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 44, height: 44, backgroundColor: "#420909" }}
                >
                  <div className="relative" style={{ width: 24, height: 24 }}>
                    <Image src={p.icon} alt="" fill sizes="24px" />
                  </div>
                </div>
                <div className="flex min-w-px flex-1 flex-col gap-[4px] text-white">
                  <p
                    className="text-[24px] leading-[1.2]"
                    style={{
                      fontFamily: "var(--font-host-grotesk), sans-serif",
                      fontWeight: 500,
                      letterSpacing: "-0.25px",
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="text-[14px] font-normal leading-[1.5] text-white"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {p.description}
                  </p>
                </div>
              </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
