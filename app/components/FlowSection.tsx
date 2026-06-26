"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRightIcon } from "./hero/icons";
import { EASE } from "./hero/motion";
import { FlowBadgeIcon, ExploreIcon, PlanIcon, DesignIcon, ImplementIcon, OptimizeIcon } from "./flow/icons";

const STAGE_WIDTH = 1440;

const DEFAULT_ACTIVE = -1;
const EASE_CSS = "cubic-bezier(0.65, 0, 0.35, 1)";

type Step = {
  num: string;
  title: string;
  description: string;
  image: string;
  Icon: typeof ExploreIcon;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Eksplorasi",
    description: "Kami pahami kebutuhan dan tantangan bisnis Anda, sebelum apa pun dirancang.",
    image: "/images/flow/step-1.png",
    Icon: ExploreIcon,
  },
  {
    num: "02",
    title: "Perencanaan",
    description: "Kami tentukan arah yang tepat, dan Anda setujui sebelum kami lanjut.",
    image: "/images/flow/step-2.png",
    Icon: PlanIcon,
  },
  {
    num: "03",
    title: "Perancangan",
    description: "Solusi dirancang mengikuti cara kerja bisnis Anda, bukan template yang dipaksakan.",
    image: "/images/flow/step-3.png",
    Icon: DesignIcon,
  },
  {
    num: "04",
    title: "Implementasi",
    description: "Kami wujudkan dengan standar yang dijaga ketat di setiap bagian. Bukan asal jadi.",
    image: "/images/flow/step-4.png",
    Icon: ImplementIcon,
  },
  {
    num: "05",
    title: "Optimasi",
    description: "Kami kembangkan performanya seiring bisnis Anda terus tumbuh",
    image: "/images/flow/step-5.png",
    Icon: OptimizeIcon,
  },
];

const DOT_BG: CSSProperties = {
  backgroundColor: "#1a1a1a",
  backgroundImage: "url('/images/flow/card-noise.png')",
  backgroundRepeat: "repeat",
  backgroundSize: "291px 218px",
};

function FlowCard({
  step,
  isActive,
  onActivate,
  variants,
}: {
  step: Step;
  isActive: boolean;
  onActivate: () => void;
  variants: Variants;
}) {
  const Icon = step.Icon;
  const layerTransition = `opacity 0.6s ${EASE_CSS}, transform 0.7s ${EASE_CSS}`;

  return (
    <motion.div
      className="relative h-full min-w-px overflow-clip"
      variants={variants}
      style={{
        flexGrow: isActive ? 1.55 : 1,
        flexBasis: 0,
        transition: `flex-grow 0.7s ${EASE_CSS}`,
      }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
    >
      {/* Inactive state */}
      <div
        className="absolute inset-0 flex flex-col justify-center gap-[12px] overflow-clip px-[12px] py-[32px] motion-reduce:transition-none"
        style={{
          ...DOT_BG,
          opacity: isActive ? 0 : 1,
          transform: isActive ? "scale(1.02)" : "scale(1)",
          transition: layerTransition,
        }}
      >
        <Image
          src="/images/flow/grunge.png"
          alt=""
          fill
          sizes="240px"
          className="pointer-events-none object-cover opacity-20"
          style={{ objectPosition: "bottom left" }}
        />
        <div className="relative flex w-full flex-col items-start gap-[12px]">
          <Icon size={24} className="text-[#9e1515]" />
          <p
            className="text-[24px] font-medium leading-[1.3] text-white"
            style={{ fontFamily: "var(--font-chivo), sans-serif" }}
          >
            {step.num}
          </p>
          <p
            className="whitespace-nowrap text-[26px] font-medium leading-[1.2] text-white"
            style={{ fontFamily: "var(--font-host-grotesk), sans-serif", letterSpacing: "-0.25px" }}
          >
            {step.title}
          </p>
          <span
            className="flex items-center gap-[8px] text-[14px] font-semibold leading-[20px] text-white"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Lihat Detail
            <ArrowRightIcon size={16} className="text-white" />
          </span>
        </div>
      </div>

      {/* Active state */}
      <div
        className="absolute inset-0 overflow-clip px-[12px] py-[32px] motion-reduce:transition-none"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1)" : "scale(1.04)",
          transition: layerTransition,
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        <Image
          src={step.image}
          alt={step.title}
          fill
          sizes="360px"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} />
        <div className="relative flex w-full flex-col items-start gap-[12px]">
          <div
            className="flex items-center justify-center rounded-full p-[10px]"
            style={{ backgroundColor: "rgba(0,0,0,0.24)" }}
          >
            <Icon size={20} className="text-white" />
          </div>
          <p
            className="whitespace-nowrap text-[40px] font-black leading-none text-white"
            style={{
              fontFamily: "var(--font-urbanist), sans-serif",
              letterSpacing: "1.6px",
              textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            {step.title}
          </p>
        </div>
        <p
          className="absolute bottom-[32px] left-[12px] w-[154px] text-[14px] font-normal leading-normal text-white"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            letterSpacing: "0.56px",
            textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FlowSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(760);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const update = () => {
      const nextScale = Math.min(1, wrapper.offsetWidth / STAGE_WIDTH);
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

  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.3 } as const;

  const groupContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.05 } },
  };
  const riseItem: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
  const rowContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.08 } },
  };
  const cardItem: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div ref={wrapperRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col gap-[40px] px-[100px] py-[80px]"
          style={{
            width: STAGE_WIDTH,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <div className="pointer-events-none absolute inset-[-19%] rotate-180">
            <Image src="/images/flow/bg-glow.svg" alt="" fill sizes="1700px" className="object-cover" />
          </div>

          <motion.div
            className="relative flex w-full flex-col items-center gap-[8px]"
            variants={groupContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.div
              className="flex items-center gap-[6px] rounded-[16px] p-[8px]"
              style={{ backgroundColor: "#0a0a0a", border: "1px solid #232426" }}
              variants={riseItem}
            >
              <div
                className="flex items-center rounded-[8px] p-[4px]"
                style={{ backgroundColor: "#9e1515" }}
              >
                <FlowBadgeIcon size={16} className="text-white" />
              </div>
              <span
                className="text-[16px] font-normal leading-[1.4]"
                style={{ color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Cara kerja
              </span>
            </motion.div>

            <motion.h2
              className="text-center text-[52px] text-white"
              style={{
                fontFamily: "var(--font-host-grotesk), sans-serif",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.25px",
              }}
              variants={riseItem}
            >
              Setiap masalah bisnis Anda, kami selesaikan dengan{" "}
              <span style={{ fontWeight: 700, color: "#9e1515" }}>cara yang tepat</span>
            </motion.h2>

            <motion.p
              className="max-w-[780px] text-center text-[18px] font-normal leading-[1.5]"
              style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
              variants={riseItem}
            >
              Dengan pendekatan yang terstruktur, transparan, dan dirancang khusus dari langkah
              pertama, tidak ada yang kami kerjakan tanpa Anda pahami sepenuhnya.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative flex h-[320px] w-full items-center overflow-clip rounded-[24px]"
            onMouseLeave={() => setActiveIndex(DEFAULT_ACTIVE)}
            variants={rowContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {STEPS.map((step, index) => (
              <FlowCard
                key={step.num}
                step={step}
                isActive={activeIndex === index}
                onActivate={() => setActiveIndex(index)}
                variants={cardItem}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
