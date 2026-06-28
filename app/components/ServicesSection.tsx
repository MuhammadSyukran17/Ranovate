"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE } from "./hero/motion";

const STAGE_WIDTH = 1440;

const FEATURED_GRADIENT = "linear-gradient(145.15deg, #420909 0%, #9e1515 100.12%)";

const SIDE_CARD_GLASS: CSSProperties = {
  backgroundColor: "rgba(10,10,10,0.55)",
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
};

const FEATURED_SHADOW =
  "0px 421px 118px 0px rgba(37,37,37,0), 0px 269px 108px 0px rgba(37,37,37,0.01), 0px 20px 91px 0px rgba(37,37,37,0.05), 0px 67px 67px 0px rgba(37,37,37,0.09), 0px 4px 12px 0px rgba(37,37,37,0.1)";

type Segment = { text: string; bold?: boolean };

type Service = {
  title: string;
  icon: string;
  href: string;
  desc: Segment[];
  body: Segment[];
  badge?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "Website Development",
    icon: "/images/services/tag-web.svg",
    href: "/layanan/website-development",
    badge: true,
    desc: [
      { text: "Untuk " },
      { text: "bisnis yang ingin tampil", bold: true },
      { text: " lebih kredibel dan dipercaya " },
      { text: "secara digital", bold: true },
    ],
    body: [
      { text: "Calon klien And", bold: true },
      { text: "a menilai bisnis Anda dari websitenya sebelum menghubungi Anda. Kami pastikan kesan pertama itu " },
      { text: "mencerminkan kualitas bisnis", bold: true },
      { text: " Anda yang sebenarnya" },
    ],
  },
  {
    title: "AI Integration",
    icon: "/images/services/tag-ai.svg",
    href: "/layanan/ai-integration",
    desc: [
      { text: "Untuk bisnis yang masih " },
      { text: "menghabiskan terlalu banyak waktu ", bold: true },
      { text: "untuk pekerjaan yang bisa " },
      { text: "diotomasi", bold: true },
    ],
    body: [
      { text: "Kami identifikasi", bold: true },
      { text: " proses mana yang paling menyita waktu tim Anda, lalu kami" },
      { text: " integrasikan AI", bold: true },
      { text: " yang benar-benar" },
      { text: " mengubah cara kerja operasional Anda", bold: true },
    ],
  },
];

function Shine({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        background:
          "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 62%)",
      }}
      initial={{ x: "-130%", opacity: 0 }}
      whileInView={{ x: "130%", opacity: [0, 1, 1, 0] }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.15, ease: "easeInOut", delay }}
    />
  );
}

function RichText({ segments, className, style }: { segments: Segment[]; className?: string; style?: CSSProperties }) {
  return (
    <p className={className} style={style}>
      {segments.map((segment, index) => (
        <span key={index} style={{ fontWeight: segment.bold ? 700 : 300 }}>
          {segment.text}
        </span>
      ))}
    </p>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex h-full w-[540px] shrink-0 flex-col items-start gap-[20px] overflow-hidden rounded-[32px] p-[20px]">
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300 group-hover:opacity-0"
        style={SIDE_CARD_GLASS}
      />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundImage: FEATURED_GRADIENT, border: "1px solid #424345", boxShadow: FEATURED_SHADOW }}
      >
        <div className="absolute" style={{ right: -468.63, top: -110.6, width: 711.633, height: 576 }}>
          <Image src="/images/services/ornament.svg" alt="" fill sizes="712px" className="object-fill" />
        </div>
      </div>

      <Shine delay={0.5} />

      <div className="relative flex w-full items-center justify-between">
        <div
          className="flex items-center justify-center rounded-full bg-[#420909] transition-colors duration-300 group-hover:bg-[#0a0a0a]"
          style={{ width: 44, height: 44 }}
        >
          <div className="relative" style={{ width: 24, height: 24 }}>
            <Image src={service.icon} alt="" fill sizes="24px" />
          </div>
        </div>
        {service.badge ? (
          <div className="flex items-center gap-[6px] rounded-[16px] bg-white/10 p-[8px] transition-colors duration-300 group-hover:bg-[#0a0a0a]">
            <div className="flex items-center rounded-[8px] p-[4px]" style={{ backgroundColor: "#ffffff" }}>
              <div className="relative size-[16px]">
                <Image src="/images/services/star.svg" alt="" fill sizes="16px" />
              </div>
            </div>
            <span
              className="whitespace-nowrap text-[16px] font-normal leading-[1.4] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Best Seller
            </span>
          </div>
        ) : null}
      </div>

      <div className="relative flex w-full flex-col items-start gap-[24px] text-white">
        <div className="flex w-full flex-col items-start gap-[6px]">
          <p
            className="w-full text-[24px] leading-[1.2]"
            style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
          >
            {service.title}
          </p>
          <RichText
            segments={service.desc}
            className="w-full text-[14px] leading-[1.5]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          />
        </div>
        <RichText
          segments={service.body}
          className="w-full text-[12px] leading-[1.5]"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        />
      </div>

      <div className="relative grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <span
            className="flex items-center justify-center gap-[8px] rounded-[18px] px-[16px] py-[14px]"
            style={{ backgroundColor: "#0a0a0a", border: "1px solid #232426" }}
          >
            <span
              className="whitespace-nowrap text-[16px] font-semibold leading-[20px] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Lihat Layanan
            </span>
            <span className="relative size-[16px]">
              <Image src="/images/services/btn-arrow.svg" alt="" fill sizes="16px" />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(820);

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

  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.25 } as const;
  const groupContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.05 } },
  };
  const headerItem: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
      };
  const cardsContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.1 } },
  };
  const cardItem: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: (dir: number) => ({
          opacity: 0,
          x: dir * 44,
          y: 72,
          rotateX: 26,
          rotateZ: dir * -1.5,
          scale: 0.9,
          filter: "blur(18px)",
        }),
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 1.3,
            ease: EASE,
            opacity: { duration: 0.7 },
            filter: { duration: 0.85, ease: "easeOut" },
            scale: { duration: 1.4, ease: [0.16, 1.04, 0.3, 1] },
          },
        },
      };

  const idleFor = (dir: number) =>
    reduce
      ? undefined
      : {
          animate: { y: [0, dir < 0 ? -11 : -8, 0], rotate: [0, dir < 0 ? -0.5 : 0.5, 0] },
          transition: {
            duration: dir < 0 ? 6.5 : 7.6,
            ease: "easeInOut" as const,
            repeat: Infinity,
            delay: dir < 0 ? 0 : 0.5,
          },
        };

  const wrapCard = (node: ReactNode, key: string, dir: number, href: string, label: string) => {
    const idle = idleFor(dir);
    return (
      <motion.div
        key={key}
        variants={cardItem}
        custom={dir}
        className="shrink-0 self-stretch"
        style={{ transformPerspective: 1400, transformStyle: "preserve-3d", transformOrigin: "center 88%" }}
      >
        <motion.div className="h-full" animate={idle?.animate} transition={idle?.transition} style={{ willChange: "transform" }}>
          <Link
            href={href}
            aria-label={label}
            className="block h-full rounded-[32px] outline-none transition-transform duration-300 hover:-translate-y-[6px] focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {node}
          </Link>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div ref={wrapperRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col items-center gap-[40px] px-[100px] py-[80px]"
          style={{ width: STAGE_WIDTH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          <div className="pointer-events-none absolute" style={{ left: -600, top: -490, width: 2033.764, height: 1317.705 }}>
            <div className="absolute inset-[-11.33%_0_-11.33%_-7.24%]">
              <Image src="/images/services/bg-glow.svg" alt="" fill sizes="2200px" className="object-fill" />
            </div>
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
              style={{ backgroundColor: "#141414", border: "1px solid #232426" }}
              variants={headerItem}
            >
              <div className="flex items-center rounded-[8px] p-[4px]" style={{ backgroundColor: "#9e1515" }}>
                <div className="relative size-[16px]">
                  <Image src="/images/services/badge.svg" alt="" fill sizes="16px" />
                </div>
              </div>
              <span
                className="text-[16px] font-normal leading-[1.4]"
                style={{ color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Layanan
              </span>
            </motion.div>

            <motion.h2
              className="text-center text-[52px] leading-[1.3] text-white"
              style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 600, letterSpacing: "-0.25px" }}
              variants={headerItem}
            >
              Temukan solusi yang tepat <span style={{ color: "#9e1515" }}>untuk bisnis Anda</span>
            </motion.h2>

            <motion.p
              className="max-w-[820px] text-center text-[18px] font-normal leading-[1.5]"
              style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
              variants={headerItem}
            >
              Setiap layanan kami dirancang untuk menyelesaikan masalah bisnis yang spesifik. Pilih yang
              paling menggambarkan kondisi Anda sekarang.
            </motion.p>
          </motion.div>

          <div className="relative w-full">
            <motion.div
              className="flex w-full items-stretch justify-center gap-[24px]"
              variants={cardsContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {wrapCard(<ServiceCard service={SERVICES[0]} />, "web", -1, SERVICES[0].href, SERVICES[0].title)}
              {wrapCard(<ServiceCard service={SERVICES[1]} />, "ai", 1, SERVICES[1].href, SERVICES[1].title)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
