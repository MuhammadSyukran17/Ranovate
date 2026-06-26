"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRightIcon } from "../../hero/icons";
import { EASE, EASE_BACK } from "../../hero/motion";

const STAGE_WIDTH = 1440;
const STAGE_HEIGHT = 962;

const HEADING_GRADIENT =
  "radial-gradient(60% 130% at 50% 50%, #ff9710 2%, #ffb14c 39%, #ffe5c3 75%, #ffffff 100%)";

function GlobeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm5.46 6H11.5a9.6 9.6 0 0 0-.77-3.41A5.51 5.51 0 0 1 13.46 7.5ZM8 13.43A8.3 8.3 0 0 1 6.55 8.5h2.9A8.3 8.3 0 0 1 8 13.43Zm-1.45-5.93A8.3 8.3 0 0 1 8 2.57 8.3 8.3 0 0 1 9.45 7.5h-2.9Zm-1.28-3.41A9.6 9.6 0 0 0 4.5 7.5H2.54a5.51 5.51 0 0 1 2.73-3.41ZM2.54 8.5H4.5a9.6 9.6 0 0 0 .77 3.41A5.51 5.51 0 0 1 2.54 8.5Zm8.19 3.41A9.6 9.6 0 0 0 11.5 8.5h1.96a5.51 5.51 0 0 1-2.73 3.41Z"
        fill="currentColor"
      />
    </svg>
  );
}

type WebsiteHeroProps = {
  badge?: string;
  titleLead?: string;
  titleAccent?: string;
  subtitle?: string;
  consultHref?: string;
};

export default function WebsiteHero({
  badge = "Website Development",
  titleLead = "Tingkatkan kredibilitas dan peluang bisnis Anda lewat ",
  titleAccent = "website yang tepat",
  subtitle = "Apapun kondisi bisnis Anda sekarang, kami rancang website yang benar-benar mencerminkan kualitas bisnis Anda yang sesungguhnya.",
  consultHref = "#kontak",
}: WebsiteHeroProps = {}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const update = () => {
      setScale(Math.min(1, element.offsetWidth / STAGE_WIDTH));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const fadeOnly: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
  };

  const glowVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, scale: 1.18 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { opacity: { duration: 1.2, ease: "easeOut" }, scale: { duration: 2.1, ease: EASE } },
        },
      };

  const barsVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, scaleX: 0.4 },
        show: { opacity: 1, scaleX: 1, transition: { duration: 1.4, ease: EASE, delay: 0.25 } },
      };

  const humanVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: 56, scale: 1.07, filter: "blur(18px)" },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 1.7, ease: EASE, delay: 0.15 },
        },
      };

  const contentContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.16,
        delayChildren: reduce ? 0 : 0.5,
      },
    },
  };

  const badgePop: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: -18, scale: 0.82, rotateX: 32 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: { duration: 0.85, ease: EASE_BACK },
        },
      };

  const headingContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.18,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const lineVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: "115%", rotateX: -52 },
        show: { opacity: 1, y: "0%", rotateX: 0, transition: { duration: 1.15, ease: EASE } },
      };

  const item: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.95, ease: EASE } },
      };

  const ctaContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };

  const ctaItem: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: 20, scale: 0.9, rotateX: -18 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: { duration: 0.85, ease: EASE_BACK },
        },
      };

  const illustrationVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, scale: 0.92, filter: "blur(14px)", clipPath: "circle(20% at 50% 52%)" },
        show: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          clipPath: "circle(85% at 50% 52%)",
          transition: { duration: 1.8, ease: EASE, delay: 1.15 },
        },
      };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div ref={wrapperRef} className="relative w-full" style={{ height: STAGE_HEIGHT * scale }}>
        <div
          className="absolute left-1/2 top-0"
          style={{
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {/* Red glow ring */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{ width: 1488, height: 1488, left: 720, top: 362, x: "-50%", y: "-50%" }}
            variants={glowVariants}
            initial="hidden"
            animate="show"
          >
            <Image src="/images/services/website/hero-glow.svg" alt="" fill priority sizes="1488px" />
          </motion.div>

          {/* Blurred red bars behind head */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left: 720, top: 310, x: "-50%", y: "-50%" }}
            variants={barsVariants}
            initial="hidden"
            animate="show"
          >
            <div className="absolute" style={{ width: 865, height: 76, left: -432, top: -38, backgroundColor: "#9e1515", filter: "blur(100px)" }} />
            <div className="absolute" style={{ width: 623, height: 38, left: -311, top: -19, backgroundColor: "#9e1515", filter: "blur(80px)" }} />
            <div className="absolute" style={{ width: 435, height: 24, left: -217, top: -12, backgroundColor: "#9e1515", filter: "blur(17.5px)" }} />
          </motion.div>

          {/* AI human image */}
          <motion.div
            className="absolute"
            style={{ width: 859, height: 910, left: "50%", top: 114, x: "-50%" }}
            variants={humanVariants}
            initial="hidden"
            animate="show"
          >
            <Image
              src="/images/services/website/hero-human.png"
              alt="Asisten AI Ranovate"
              fill
              priority
              sizes="859px"
              className="pointer-events-none object-cover object-top"
            />
          </motion.div>

          {/* Floating tech-logo illustration */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{ width: 1096, height: 664, left: 720, top: 298, x: "-50%" }}
            variants={illustrationVariants}
            initial="hidden"
            animate="show"
          >
            <Image src="/images/services/website/hero-illustration.png" alt="" fill priority sizes="1096px" className="object-contain" />
          </motion.div>

          {/* Text content */}
          <motion.div
            className="absolute flex flex-col items-center gap-[16px]"
            style={{ width: 1240, left: 100, top: 182 }}
            variants={contentContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={badgePop}
              className="flex items-center gap-[6px] rounded-[16px] p-[8px]"
              style={{ backgroundColor: "#0a0a0a", border: "1px solid #232426", transformPerspective: 800 }}
            >
              <span
                className="flex items-center justify-center rounded-[8px] p-[4px]"
                style={{ backgroundColor: "#de1d1e" }}
              >
                <GlobeIcon size={16} className="text-white" />
              </span>
              <span
                className="whitespace-nowrap text-[16px] font-normal leading-[1.4]"
                style={{ fontFamily: "var(--font-inter), sans-serif", color: "#9e1515" }}
              >
                {badge}
              </span>
            </motion.div>

            <motion.h1
              variants={headingContainer}
              className="max-w-[1000px] text-center text-[48px] text-white"
              style={{
                fontFamily: "var(--font-host-grotesk), sans-serif",
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: "-0.25px",
              }}
            >
              <span className="block overflow-hidden pb-[2px]">
                <motion.span
                  className="block"
                  style={{ transformOrigin: "center bottom", transformPerspective: 800 }}
                  variants={lineVariants}
                >
                  {titleLead}
                  <span
                    style={{
                      backgroundImage: HEADING_GRADIENT,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {titleAccent}
                  </span>
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-[760px] text-center text-[18px] font-normal leading-[1.5] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {subtitle}
            </motion.p>

            <motion.div variants={ctaContainer} className="flex items-start gap-[12px]" style={{ transformPerspective: 800 }}>
              <motion.a
                variants={ctaItem}
                href={consultHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex cursor-pointer items-center justify-center gap-[8px] overflow-clip rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white transition-[filter] hover:brightness-110"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  border: "1px solid #a50000",
                  backgroundImage: "linear-gradient(180deg, #9e1515 0%, #b61718 100%)",
                  boxShadow:
                    "inset 0px 4px 4px 0px rgba(255,200,200,0.25), inset -2px -3px 6.119px 1px rgba(255,200,200,0.2)",
                }}
              >
                <span className="relative">Konsultasi Gratis</span>
                <ArrowRightIcon
                  size={16}
                  className="relative text-white transition-transform duration-300 group-hover:translate-x-[3px]"
                />
              </motion.a>
              <motion.a
                variants={ctaItem}
                href="#portofolio"
                className="relative flex items-center justify-center gap-[8px] overflow-clip rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white transition-[filter] hover:brightness-125"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  backgroundColor: "#141414",
                  border: "1px solid #232426",
                  boxShadow: "inset -0.907px 0.907px 6.119px 0px rgba(130,186,255,0.2)",
                }}
              >
                Lihat Portofolio Kami
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
