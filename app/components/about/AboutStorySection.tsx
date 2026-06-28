"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { EASE } from "../hero/motion";

const STAGE_WIDTH = 1440;
const VIEWPORT = { once: true, amount: 0.2 } as const;

const CARD: CSSProperties = {
  border: "1px solid transparent",
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.008) 60%, rgba(255,255,255,0) 100%) padding-box, " +
    "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.09) 35%, rgba(255,255,255,0.02) 100%) border-box",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
};

type Segment = { text: string; bold?: boolean };

const MISSION: Segment[] = [
  { text: "Membantu bisnis membangun " },
  { text: "sistem yang benar-benar pas", bold: true },
  { text: " untuk cara kerja mereka, supaya bisa berjalan dengan jelas, tumbuh, dan siap menghadapi era AI." },
];

const VISION: Segment[] = [
  { text: "Menjadi nama yang " },
  { text: "paling diperhitungkan", bold: true },
  { text: " ketika bisnis membutuhkan " },
  { text: "sistem digital yang benar-benar bisa diandalkan", bold: true },
  { text: ". Bukan yang paling ramai, tapi yang paling dipercaya." },
];

const WHY: Segment[] = [
  {
    text: "Banyak klinik kehilangan pasien karena alur booking yang membingungkan. Kami merancang ulang antarmuka ini dengan fokus pada kemudahan pengguna (UX). Hasilnya, ",
  },
  { text: "alur menjadi lebih singkat, rapi", bold: true },
  { text: ", dan menumbuhkan rasa percaya sejak klik pertama." },
];

function ParallaxImage({ src, alt, className, sizes }: { src: string; alt: string; className?: string; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-11%", "11%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[12px] ${className ?? ""}`}>
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y, scale: 1.22 }}>
        <Image src={src} alt={alt} fill sizes={sizes ?? "(min-width: 1024px) 560px, 90vw"} loading="lazy" className="object-cover" />
      </motion.div>
    </div>
  );
}

function RichText({ segments, className, style }: { segments: Segment[]; className?: string; style?: CSSProperties }) {
  return (
    <p className={className} style={style}>
      {segments.map((segment, index) => (
        <span key={index} style={segment.bold ? { fontWeight: 700, color: "#ffffff" } : undefined}>
          {segment.text}
        </span>
      ))}
    </p>
  );
}

function StoryCard({ title, image, body, variants }: { title: string; image: string; body: Segment[]; variants: Variants }) {
  return (
    <motion.div className="flex flex-1 flex-col items-start gap-[20px] rounded-[24px] p-[24px]" style={CARD} variants={variants}>
      <p
        className="w-full text-[24px] leading-[1.2] text-white"
        style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
      >
        {title}
      </p>
      <ParallaxImage src={image} alt={title} className="h-[326px] w-full" />
      <RichText
        segments={body}
        className="w-full text-[24px] leading-[1.2]"
        style={{ fontFamily: "var(--font-host-grotesk), sans-serif", color: "#808287", letterSpacing: "-0.25px" }}
      />
    </motion.div>
  );
}

export default function AboutStorySection() {
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
  const cardsContainer: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.1 } } };
  const cardItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(12px)" },
        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
      };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div ref={wrapperRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col items-start gap-[40px] px-[100px] pb-[80px] pt-[16px]"
          style={{ width: STAGE_WIDTH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute rotate-180"
            style={{ top: "20.95%", bottom: "20.08%", left: "-19.44%", right: "-19.44%" }}
          >
            <Image src="/images/about/story/bg-lines.svg" alt="" fill sizes="140vw" className="object-cover" />
          </div>

          <motion.div
            className="relative z-[1] flex w-[1240px] flex-col items-start gap-[24px]"
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className="flex w-full items-start gap-[24px]">
              <StoryCard title="Our Mission" image="/images/about/story/mission.webp" body={MISSION} variants={cardItem} />
              <StoryCard title="Our Vision" image="/images/about/story/vision.webp" body={VISION} variants={cardItem} />
            </div>

            <motion.div className="flex w-full flex-col items-start gap-[20px] rounded-[24px] p-[24px]" style={CARD} variants={cardItem}>
              <p
                className="whitespace-nowrap text-[24px] leading-[1.2] text-white"
                style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
              >
                Mengapa Kami Ada
              </p>
              <div className="flex w-full items-start gap-[32px]">
                <ParallaxImage src="/images/about/story/why.webp" alt="Mengapa Kami Ada" className="h-[326px] w-[560px] shrink-0" sizes="560px" />
                <div className="flex min-w-px flex-1 flex-col items-start gap-[16px]">
                  <p
                    className="text-[24px] leading-[1.2] text-white"
                    style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
                  >
                    Redesain Platform Booking Klinik (Proyek Konsep)
                  </p>
                  <RichText
                    segments={WHY}
                    className="w-full text-[16px] font-normal leading-[1.5]"
                    style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
