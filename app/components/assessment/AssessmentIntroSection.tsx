"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE, EASE_BACK } from "../hero/motion";
import { ArrowRightIcon } from "../hero/icons";

const VIEWPORT = { once: true, amount: 0.4 } as const;

const HEADING_GRADIENT =
  "radial-gradient(60% 130% at 50% 50%, #ff9710 2%, #ffb14c 39%, #ffe5c3 75%, #ffffff 100%)";

type IconProps = { className?: string };

function ClockIcon({ className }: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
      <path d="M8 4.5V8L10.25 9.25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SkipIcon({ className }: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M3 3.5L9.5 8L3 12.5V3.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M12.5 3.5V12.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M8 1.5L13 3.5V7.5C13 10.75 10.75 13.25 8 14.5C5.25 13.25 3 10.75 3 7.5V3.5L8 1.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M6 8L7.5 9.5L10.25 6.25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const META = [
  { icon: ClockIcon, label: "± 1 menit" },
  { icon: SkipIcon, label: "Bisa di-skip" },
  { icon: ShieldIcon, label: "Tanpa keharusan deal" },
];

export default function AssessmentIntroSection() {
  const reduce = useReducedMotion() ?? false;

  const fade: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.45 } } };
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } };
  const item: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
      };
  const popItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 18, scale: 0.92 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_BACK } },
      };

  return (
    <section
      className="relative flex min-h-[calc(100vh-107px)] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 sm:px-10 lg:px-[80px]"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 0 }}>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 1100,
            height: 440,
            opacity: 0.4,
            maskImage: "radial-gradient(54% 56% at 50% 50%, #000 0%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(54% 56% at 50% 50%, #000 0%, transparent 72%)",
          }}
        >
          <Image src="/images/cta/grid.svg" alt="" fill sizes="1100px" className="object-cover" />
        </div>
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ width: 760, height: 64, backgroundColor: "#9e1515", filter: "blur(110px)" }} />
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ width: 440, height: 30, backgroundColor: "#c81e1e", filter: "blur(40px)" }} />
      </div>

      <motion.div
        className="relative z-[1] flex w-full max-w-[960px] flex-col items-center gap-[40px]"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <div className="flex flex-col items-center gap-[24px]">
          <motion.div
            variants={item}
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
              Assessment
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-center text-[36px] leading-[1.3] text-white sm:text-[44px] lg:text-[52px]"
            style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 600, letterSpacing: "-0.25px" }}
          >
            Belum Yakin Mulai{" "}
            <span
              style={{
                backgroundImage: HEADING_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              dari Mana?
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-[640px] text-center text-[16px] font-normal leading-[1.5] text-white sm:text-[18px]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Jawab beberapa pertanyaan singkat, tidak sampai semenit, dan kami akan mengarahkan anda.
          </motion.p>
        </div>

        <motion.div variants={popItem}>
          <Link
            href="/assessment/mulai"
            className="flex items-center justify-center gap-[8px] rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white transition-opacity duration-200 hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary, #de1d1e)", fontFamily: "var(--font-inter), sans-serif" }}
          >
            Mulai
            <ArrowRightIcon size={16} className="text-white" />
          </Link>
        </motion.div>

        <motion.div variants={popItem} className="flex flex-wrap items-center justify-center gap-x-[16px] gap-y-[8px]">
          {META.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-[8px]" style={{ color: "#bbbdc1" }}>
              <Icon className="shrink-0" />
              <span
                className="whitespace-nowrap text-[14px] font-normal leading-[20px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {label}
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
