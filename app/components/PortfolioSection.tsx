"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRightIcon } from "./hero/icons";
import { EASE, EASE_BACK } from "./hero/motion";
import { PortfolioBadgeIcon } from "./portfolio/icons";
import ProjectCard, { type Project } from "./portfolio/ProjectCard";

const STAGE_WIDTH = 1440;

const FILTERS = ["Website Development", "AI Integration", "Agentic AI"];

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
  {
    category: "Mobile App",
    date: "21 Feb",
    title: "GOMH - Malaysian Medical Tourist",
    description: "Lorem ipsum des the ans ajala reamot atnaoo manet adis",
    image: "/images/portfolio/mockup-4.png",
  },
];

export default function PortfolioSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(820);
  const [activeFilter, setActiveFilter] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const update = () => {
      const nextScale = Math.min(1, wrapper.offsetWidth / STAGE_WIDTH);
      scaleRef.current = nextScale;
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

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let active = false;
    let startX = 0;
    let startScroll = 0;

    const down = (event: PointerEvent) => {
      active = true;
      startX = event.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!active) return;
      el.scrollLeft = startScroll - (event.clientX - startX) / scaleRef.current;
    };
    const up = (event: PointerEvent) => {
      active = false;
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {}
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

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
  const filterItem: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_BACK } },
      };
  const cardsContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.1 } },
  };
  const cardItem: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, scale: 0.9, rotateY: -16 },
        show: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 0.85, ease: EASE } },
      };

  return (
    <section id="portofolio" className="relative w-full scroll-mt-[107px] overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            left: -220,
            top: "44%",
            width: 620,
            height: 620,
            transform: "translateY(-50%)",
            background:
              "radial-gradient(circle, rgba(158,21,21,0.5) 0%, rgba(66,9,9,0.28) 50%, rgba(10,10,10,0) 72%)",
            filter: "blur(55px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            right: -200,
            top: "40%",
            width: 600,
            height: 600,
            transform: "translateY(-50%)",
            background:
              "radial-gradient(circle, rgba(158,21,21,0.45) 0%, rgba(66,9,9,0.25) 50%, rgba(10,10,10,0) 72%)",
            filter: "blur(55px)",
          }}
        />
      </div>

      <div ref={wrapperRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col items-center gap-[40px] px-[100px] py-[80px]"
          style={{
            width: STAGE_WIDTH,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
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
              Setiap proyek dibangun dengan tujuan yang jelas, mulai dari meningkatkan efisiensi,
              memperkuat kredibilitas, hingga mendukung pertumbuhan bisnis.
            </motion.p>
          </motion.div>

          <div className="relative flex w-full flex-col items-center gap-[40px]">
            <motion.div
              className="flex w-full items-center justify-center gap-[16px]"
              variants={groupContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {FILTERS.map((filter, index) => {
                const isActive = activeFilter === index;
                return (
                  <motion.button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(index)}
                    variants={filterItem}
                    className="flex items-center justify-center overflow-clip rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] transition-colors"
                    style={
                      isActive
                        ? { backgroundColor: "#420909", color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }
                        : {
                            backgroundColor: "rgba(255,255,255,0.1)",
                            border: "1px solid #232426",
                            color: "#ffffff",
                            boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
                            fontFamily: "var(--font-inter), sans-serif",
                          }
                    }
                  >
                    {filter}
                  </motion.button>
                );
              })}
            </motion.div>

            <div className="flex w-full flex-col items-center gap-[20px]">
              <motion.div
                ref={carouselRef}
                className="flex w-full cursor-grab touch-pan-y items-center gap-[16px] overflow-x-auto overflow-y-hidden select-none active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none" }}
                variants={cardsContainer}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                {PROJECTS.map((project) => (
                  <motion.div
                    key={project.title}
                    variants={cardItem}
                    className="w-[319.231px] shrink-0"
                    style={{ transformPerspective: 1200 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>

              <button
                type="button"
                className="flex items-center justify-center gap-[8px] overflow-clip text-[16px] font-semibold leading-[20px]"
                style={{ color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Lihat Portofolio Kami
                <ArrowRightIcon size={16} className="text-[#9e1515]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
