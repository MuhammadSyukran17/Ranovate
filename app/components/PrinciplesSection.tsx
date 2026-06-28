"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  type Variants,
} from "motion/react";
import { EASE } from "./hero/motion";

const STAGE_WIDTH = 1440;
const STAGE_HEIGHT = 1178;

const HUB_X = 719;
const HUB_Y = 793;
const CARD_WIDTH = 468;
const CARD_HALF_HEIGHT = 57.5;
const EMANATE_FACTOR = 0.24;

type CardOffset = { dx: number; dy: number };

const CENTER_GRADIENT =
  "linear-gradient(180deg, #0a0a0a 0%, rgba(10,10,10,0) 10%, rgba(10,10,10,0.428) 80%, #0a0a0a 100%)";

const CARD_GLASS: CSSProperties = {
  backgroundColor: "rgba(17,17,18,0.82)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
};

const CARD_GLASS_LIGHT: CSSProperties = {
  backgroundColor: "rgba(18,18,19,0.6)",
  border: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)",
};

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

  const seg = length * 0.1;
  const dash = `${seg} ${length - seg}`;
  const drawDur = 0.7;
  const style = {
    strokeDashoffset: 0,
    animation: `principles-pulse ${duration}s linear ${drawDur}s infinite`,
    "--pulse-off": `${-dir * length}`,
  } as CSSProperties;
  const drawStyle = {
    strokeDasharray: length,
    strokeDashoffset: dir === 1 ? length : -length,
    animation: `principles-draw ${drawDur}s cubic-bezier(0.16,1,0.3,1) forwards, principles-fade-out 0.4s ease ${drawDur}s forwards`,
  } as CSSProperties;

  return (
    <svg
      className="absolute inset-0 h-full w-full overflow-visible"
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path ref={pathRef} d={path} stroke="none" />
      {play && length > 0 && (
        <>
          <path d={path} stroke="#ffe6d6" strokeWidth={2} strokeLinecap="round" style={drawStyle} />
          <path d={path} stroke="#9e1515" strokeWidth={6} strokeLinecap="round" opacity={0.3} strokeDasharray={dash} style={style} />
          <path d={path} stroke="#ff3b1e" strokeWidth={3.6} strokeLinecap="round" opacity={0.7} strokeDasharray={dash} style={style} />
          <path d={path} stroke="#ffd9c2" strokeWidth={1.6} strokeLinecap="round" strokeDasharray={dash} style={style} />
        </>
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
  const [sweepDone, setSweepDone] = useState(false);
  const viewport = { once: true, amount: 0.25 } as const;
  const fade: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } };

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start end", "end start"] });
  const bgGlowYRaw = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const bgGlowY = useSpring(bgGlowYRaw, { stiffness: 70, damping: 24, mass: 0.5 });
  const bgGlowTransform = useMotionTemplate`translateY(${bgGlowY}px)`;

  const headerContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.15 } },
  };
  const badgeItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, scale: 0.92 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
      };
  const headingItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.05, ease: EASE } },
      };

  const glowItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, scale: 1.04 },
        show: { opacity: 1, scale: 1, transition: { duration: 1.8, ease: EASE } },
      };

  const linesContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.5 } },
  };
  const lineItem: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
  };

  const cardsContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: reduce ? 0 : 0.8 } },
  };
  const cardItem: Variants = reduce
    ? fade
    : {
        hidden: (offset: CardOffset) => ({ opacity: 0, scale: 0.94, x: offset.dx, y: offset.dy }),
        show: { opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 1.05, ease: EASE } },
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
            {inView && !reduce && (
              <div
                className="principles-chip-glow pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(40% 38% at 50% 45%, rgba(255,90,55,0.5) 0%, rgba(158,21,21,0) 70%)",
                }}
              />
            )}
            {inView && !reduce && !sweepDone && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="principles-sweep absolute inset-y-[-15%] -left-1/2 w-1/2"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 0%, rgba(255,210,185,0.1) 35%, rgba(255,240,230,0.42) 50%, rgba(255,210,185,0.1) 65%, transparent 100%)",
                  }}
                  onAnimationEnd={() => setSweepDone(true)}
                />
              </div>
            )}
            <div className="absolute inset-0" style={{ backgroundImage: CENTER_GRADIENT }} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute -scale-y-100"
            style={{ left: -607, bottom: -475.71, width: 2033.764, height: 1317.705 }}
            variants={glowItem}
          >
            <motion.div
              className="absolute inset-[-11.33%_0_-11.33%_-7.24%]"
              style={reduce ? undefined : { transform: bgGlowTransform, willChange: "transform" }}
            >
              <Image src="/images/principles/bg-glow.svg" alt="" fill sizes="2200px" className="object-fill" />
            </motion.div>
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
                    <div className={`absolute ${line.insetClass}`}>
                      <Image
                        src={line.src}
                        alt=""
                        fill
                        sizes="360px"
                        className="object-fill"
                      />
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

          <motion.div className="absolute inset-0" variants={cardsContainer}>
            {PRINCIPLES.map((p) => {
              const glass = p.translucent ? CARD_GLASS_LIGHT : CARD_GLASS;
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
                  contain: "paint",
                  ...glass,
                }}
                variants={cardItem}
                custom={offset}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                        borderColor: "rgba(255,255,255,0.14)",
                        boxShadow:
                          "inset 0 1px 0 0 rgba(255,255,255,0.07), 0 20px 50px -22px rgba(158,21,21,0.55)",
                        transition: { duration: 0.18, ease: EASE },
                      }
                }
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
