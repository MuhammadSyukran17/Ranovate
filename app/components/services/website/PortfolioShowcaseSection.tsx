"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PortfolioBadgeIcon } from "../../portfolio/icons";
import ProjectCard, { type Project } from "../../portfolio/ProjectCard";
import { EASE, EASE_BACK } from "../../hero/motion";

const STAGE_WIDTH = 1440;
const DIAG_STEP = 0.09;

const VIEWPORT = { once: true, amount: 0.15 } as const;

const PROJECTS: Project[] = [
  {
    category: "Mobile App",
    date: "12 August",
    title: "KontrakHUB - Manage Your Contract Easly",
    description: "Lorem ipsum des the ans ajala reamot atnaoo manet adis",
    image: "/images/portfolio/mockup-1.png",
  },
  {
    category: "Mobile App",
    date: "5 June",
    title: "My Mental - Heal Your Mental Health",
    description: "Lorem ipsum des the ans ajala reamot atnaoo manet adis",
    image: "/images/portfolio/mockup-2.png",
  },
  {
    category: "Mobile App",
    date: "14 March",
    title: "CHUP Hospital - A New Way to Manage Hospital",
    description: "Lorem ipsum des the ans ajala reamot atnaoo manet adis",
    image: "/images/portfolio/mockup-3.png",
  },
];

const CARDS: Project[] = [...PROJECTS, ...PROJECTS, ...PROJECTS];

function Shine({ diag, reduce }: { diag: number; reduce: boolean }) {
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
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: "easeInOut", delay: diag * DIAG_STEP + 0.45 }}
    />
  );
}

export default function PortfolioShowcaseSection() {
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

  const fade: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.45 } } };

  const headerContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const headerItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
      };

  const gridContainer: Variants = { hidden: {}, show: {} };
  const cardItem: Variants = reduce
    ? fade
    : {
        hidden: { opacity: 0, y: 44, scale: 0.92, rotateX: 14, filter: "blur(16px)" },
        show: (diag: number) => ({
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          transition: {
            delay: diag * DIAG_STEP,
            duration: 0.95,
            ease: EASE_BACK,
            opacity: { duration: 0.6, ease: EASE, delay: diag * DIAG_STEP },
            filter: { duration: 0.8, ease: EASE, delay: diag * DIAG_STEP },
          },
        }),
      };
  const idle = (diag: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -6, 0] },
          transition: {
            duration: 6.8 + (diag % 3) * 0.5,
            ease: "easeInOut" as const,
            repeat: Infinity,
            delay: diag * DIAG_STEP + 1.0,
          },
        };

  return (
    <section id="portofolio" className="relative w-full scroll-mt-[107px] overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            left: -220,
            top: "52%",
            width: 620,
            height: 620,
            transform: "translateY(-50%)",
            background: "radial-gradient(circle, rgba(158,21,21,0.5) 0%, rgba(66,9,9,0.28) 50%, rgba(10,10,10,0) 72%)",
            filter: "blur(55px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            right: -200,
            top: "48%",
            width: 600,
            height: 600,
            transform: "translateY(-50%)",
            background: "radial-gradient(circle, rgba(158,21,21,0.45) 0%, rgba(66,9,9,0.25) 50%, rgba(10,10,10,0) 72%)",
            filter: "blur(55px)",
          }}
        />
      </div>

      <div ref={wrapperRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col items-center gap-[40px] px-[180px] py-[80px]"
          style={{ width: STAGE_WIDTH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          <motion.div
            className="relative flex w-full flex-col items-center gap-[8px]"
            variants={headerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div
              className="flex items-center gap-[6px] rounded-[16px] p-[8px]"
              style={{ backgroundColor: "#0a0a0a", border: "1px solid #232426" }}
              variants={headerItem}
            >
              <div className="flex items-center rounded-[8px] p-[4px]" style={{ backgroundColor: "#9e1515" }}>
                <PortfolioBadgeIcon size={16} className="text-white" />
              </div>
              <span
                className="text-[16px] font-normal leading-[1.4]"
                style={{ color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Portfolio
              </span>
            </motion.div>

            <motion.h2
              className="text-center text-[52px] leading-[1.3] text-white"
              style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 600, letterSpacing: "-0.25px" }}
              variants={headerItem}
            >
              Dari Kebutuhan Bisnis <span style={{ color: "#9e1515" }}>Menjadi Hasil Nyata</span>
            </motion.h2>

            <motion.p
              className="max-w-[820px] text-center text-[18px] font-normal leading-[1.5]"
              style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
              variants={headerItem}
            >
              Setiap proyek dibangun dengan tujuan yang jelas, mulai dari meningkatkan efisiensi, memperkuat
              kredibilitas, hingga mendukung pertumbuhan bisnis.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid w-full grid-cols-3 gap-[20px]"
            variants={gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {CARDS.map((project, i) => {
              const diag = Math.floor(i / 3) + (i % 3);
              return (
                <motion.div
                  key={i}
                  variants={cardItem}
                  custom={diag}
                  style={{ transformPerspective: 1200, willChange: "transform" }}
                >
                  <motion.div {...idle(diag)}>
                    <div className="relative">
                      <ProjectCard project={project} compact />
                      <Shine diag={diag} reduce={reduce} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
