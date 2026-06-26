"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTime,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import Navbar from "./Navbar";
import { ArrowRightIcon, ServiceIcon } from "./hero/icons";
import { EASE, EASE_BACK } from "./hero/motion";

const STAGE_WIDTH = 1440;
const STAGE_HEIGHT = 1144;
const MIN_SCALE = 0.85;

const SHOW_PORTFOLIO_PREVIEW = false;

const GLOW =
  "radial-gradient(72% 72% at 50% 33%, #c3191b 8%, #b3181a 16%, #931819 30%, #7d1415 40%, #5a0e0f 56%, #370809 74%, #220406 90%, #140202 100%)";

const HEADING_GRADIENT =
  "radial-gradient(60% 130% at 50% 50%, #ff9710 2%, #ffb14c 39%, #ffe5c3 75%, #ffffff 100%)";

const HEADING_LINES = [
  "Sistem yang dirancang",
  "khusus untuk bisnis Anda",
  "melangkah lebih jauh",
];

const AVATARS = [
  "/images/hero/avatar-1.webp",
  "/images/hero/avatar-2.webp",
  "/images/hero/avatar-3.webp",
  "/images/hero/avatar-4.webp",
];

const GLASS_CARD: CSSProperties = {
  backgroundColor: "rgba(18,18,18,0.45)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.09)",
};

type PortfolioCardData = {
  image: string;
  tag: string;
  width: number;
  bg: string;
  objectPosition: string;
  bordered: boolean;
};

const PORTFOLIO_CARDS: PortfolioCardData[] = [
  {
    image: "/images/hero/portfolio-1.webp",
    tag: "Website",
    width: 352,
    bg: "rgba(115,155,255,0.2)",
    objectPosition: "top",
    bordered: false,
  },
  {
    image: "/images/hero/portfolio-2.webp",
    tag: "Website",
    width: 192,
    bg: "rgba(90,181,83,0.2)",
    objectPosition: "center",
    bordered: false,
  },
  {
    image: "/images/hero/portfolio-3.webp",
    tag: "Website",
    width: 439,
    bg: "rgba(252,120,219,0.2)",
    objectPosition: "center",
    bordered: false,
  },
  {
    image: "/images/hero/portfolio-4.webp",
    tag: "Automation",
    width: 302,
    bg: "rgba(252,120,219,0.12)",
    objectPosition: "center",
    bordered: true,
  },
];

function useDrift(
  time: MotionValue<number>,
  ampX: number,
  ampY: number,
  periodX: number,
  periodY: number,
  phase: number,
) {
  const x = useTransform(time, (t) => Math.sin(t / periodX + phase) * ampX);
  const y = useTransform(time, (t) => Math.cos(t / periodY + phase) * ampY);
  return { x, y, willChange: "transform" };
}

function useFloatCard(time: MotionValue<number>, phase: number) {
  const x = useTransform(time, (t) => Math.cos(t / 3400 + phase) * 3);
  const y = useTransform(time, (t) => Math.sin(t / 2600 + phase) * 6);
  const rotateX = useTransform(time, (t) => Math.sin(t / 3100 + phase) * 1.6);
  const rotateY = useTransform(time, (t) => Math.cos(t / 3800 + phase) * 1.6);
  return { x, y, rotateX, rotateY, transformPerspective: 900, willChange: "transform" };
}

function PortfolioCard({ card, variants }: { card: PortfolioCardData; variants: Variants }) {
  return (
    <motion.div
      className="relative h-full shrink-0 overflow-clip rounded-[18px]"
      style={{ width: card.width, backgroundColor: card.bg, transformPerspective: 900 }}
      variants={variants}
    >
      <Image
        src={card.image}
        alt={`Proyek ${card.tag}`}
        fill
        sizes="440px"
        className="object-cover"
        style={{ objectPosition: card.objectPosition }}
      />
      <div
        className="absolute bottom-[12px] left-[12px] flex items-center justify-center overflow-clip rounded-full px-[12px] py-[8px]"
        style={{
          backgroundColor: "#0a0a0a",
          border: card.bordered ? "0.755px solid #424345" : "none",
        }}
      >
        <span
          className="whitespace-nowrap text-[12px] font-medium leading-[15px] text-white"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {card.tag}
        </span>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const [parallaxOn, setParallaxOn] = useState(false);
  const reduce = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 22 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollSpring = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  const glowX = useTransform(springX, (v) => v * 16);
  const humanX = useTransform(springX, (v) => v * 36);
  const headX = useTransform(springX, (v) => v * 70);
  const subX = useTransform(springX, (v) => v * 84);
  const svcX = useTransform(springX, (v) => v * 120);
  const trustX = useTransform(springX, (v) => v * 120);

  const glowY = useTransform([springY, scrollSpring], ([p, s]: number[]) => p * 14 + s * 20);
  const humanY = useTransform([springY, scrollSpring], ([p, s]: number[]) => p * 28 + s * 60);
  const headY = useTransform([springY, scrollSpring], ([p, s]: number[]) => p * 56 + s * 120);
  const subY = useTransform([springY, scrollSpring], ([p, s]: number[]) => p * 68 + s * 140);
  const svcY = useTransform([springY, scrollSpring], ([p, s]: number[]) => p * 96 + s * 180);
  const trustY = useTransform([springY, scrollSpring], ([p, s]: number[]) => p * 96 + s * 180);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const width = element.offsetWidth;
      const availableHeight = window.innerHeight - (rect.top + window.scrollY);
      const heightScale = Math.max(MIN_SCALE, availableHeight / STAGE_HEIGHT);
      setScale(Math.min(1, width / STAGE_WIDTH, heightScale));
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

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setParallaxOn(!reduce && query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [reduce]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!parallaxOn) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const fadeOnly: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.3 } },
  };

  const glowVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, scale: 1.08 },
        show: { opacity: 1, scale: 1, transition: { duration: 1.9, ease: EASE } },
      };

  const headVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, scale: 0.9, z: -220, rotateY: 16, rotateX: 6, y: 30, filter: "blur(14px)" },
        show: {
          opacity: 1,
          scale: 1,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1.8, ease: EASE, delay: 0.35 },
        },
      };

  const serviceCardVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: -28, z: -140, rotateX: 18, rotateY: -12, scale: 0.9 },
        show: {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          transition: { duration: 1.4, ease: EASE_BACK, delay: 0.85 },
        },
      };

  const trustCardVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: 30, z: -140, rotateX: -14, rotateY: 10, scale: 0.9 },
        show: {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          transition: { duration: 1.4, ease: EASE_BACK, delay: 1.35 },
        },
      };

  const subtextVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay: 1 } },
      };

  const headingContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.16,
        delayChildren: reduce ? 0 : 0.7,
      },
    },
  };

  const lineVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: "110%", rotateX: -55 },
        show: { opacity: 1, y: "0%", rotateX: 0, transition: { duration: 1.2, ease: EASE } },
      };

  const barVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { scaleX: 0, opacity: 0.6 },
        show: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: EASE, delay: 1.1 } },
      };

  const ctaContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.14,
        delayChildren: reduce ? 0 : 1.2,
      },
    },
  };

  const ctaItem: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: 20, scale: 0.9, rotateX: -15 },
        show: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { duration: 0.95, ease: EASE_BACK } },
      };

  const stripContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.14,
        delayChildren: reduce ? 0 : 1.55,
      },
    },
  };

  const stripCardVariants: Variants = reduce
    ? fadeOnly
    : {
        hidden: { opacity: 0, y: 40, z: -80, rotateX: -20 },
        show: {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          transition: { duration: 1.1, ease: EASE_BACK },
        },
      };

  const time = useTime();
  const glowPulse = useTransform(time, (t) => 0.9 + Math.sin(t / 4200) * 0.1);
  const humanFloatY = useTransform(time, (t) => Math.sin(t / 4200) * 4);
  const humanBreath = useTransform(time, (t) => 1 + Math.sin(t / 4800) * 0.01);
  const headingDrift = useDrift(time, 3, 3, 5200, 6100, 0);
  const subtextDrift = useDrift(time, 4, 4, 4800, 5600, 1.3);
  const serviceFloat = useFloatCard(time, 0);
  const trustFloat = useFloatCard(time, 2.4);

  return (
    <section
      ref={sectionRef}
      id="beranda"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#140202" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={parallaxOn ? { x: glowX, y: glowY } : undefined}
      >
        <motion.div
          className="absolute inset-0"
          variants={glowVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="absolute inset-0"
            style={reduce ? { backgroundImage: GLOW } : { backgroundImage: GLOW, opacity: glowPulse }}
          />
        </motion.div>
      </motion.div>

      <Navbar />

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
          {/* AI human asset */}
          <motion.div className="absolute inset-0" style={parallaxOn ? { x: humanX, y: humanY } : undefined}>
            <div className="absolute left-1/2 h-[1487px] w-[1416px] -translate-x-1/2" style={{ top: -8 }}>
              <motion.div
                className="relative h-full w-full"
                style={{ transformPerspective: 1400 }}
                variants={headVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div
                  className="relative h-full w-full"
                  style={reduce ? undefined : { y: humanFloatY, scale: humanBreath, willChange: "transform" }}
                >
                  <Image
                    src="/images/hero/ai-human.webp"
                    alt="Asisten AI Ranovate"
                    fill
                    priority
                    sizes="1416px"
                    className="pointer-events-none object-contain object-top"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating card — services */}
          <motion.div
            className="absolute"
            style={{
              top: 34,
              left: "calc(62.5% - 15px)",
              right: "calc(6.25% + 93px)",
              ...(parallaxOn ? { x: svcX, y: svcY } : {}),
            }}
          >
            <motion.div
              style={{ transformPerspective: 1000 }}
              variants={serviceCardVariants}
              initial="hidden"
              animate="show"
            >
            <motion.div
              className="flex flex-col items-start rounded-[24px] p-[12px]"
              style={reduce ? GLASS_CARD : { ...GLASS_CARD, ...serviceFloat }}
            >
              <div className="flex items-center gap-[8px]">
                <div
                  className="flex size-[44px] shrink-0 items-center justify-center overflow-clip rounded-[12px]"
                  style={{ backgroundColor: "#420909" }}
                >
                  <ServiceIcon size={24} className="text-[#9e1515]" />
                </div>
                <div className="flex flex-col gap-[2px] whitespace-nowrap text-white">
                  <p
                    className="text-[18px] font-semibold leading-[28px]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Solusi Digital End-to-End
                  </p>
                  <p
                    className="text-[12px] font-normal leading-[1.5]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Dari ide hingga implementasi, semua kami wujudkan
                  </p>
                </div>
              </div>
            </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero heading */}
          <div className="absolute h-[188px]" style={{ top: 294, left: 100, right: "calc(43.75% + 67px)" }}>
            <motion.div className="absolute inset-0" style={parallaxOn ? { x: headX, y: headY } : undefined}>
            <motion.div className="absolute inset-0" style={reduce ? undefined : headingDrift}>
            <motion.div
              className="absolute h-[60px] w-[491px] rounded-l-[8px]"
              style={{
                top: 128,
                left: 4,
                transformOrigin: "left",
                backgroundImage: "linear-gradient(to right, #9e1515 23.281%, rgba(158,21,21,0))",
              }}
              variants={barVariants}
              initial="hidden"
              animate="show"
            />
            <motion.h1
              className="absolute top-0 w-[635px] text-[48px] text-white"
              style={{
                left: 8,
                fontFamily: "var(--font-host-grotesk), sans-serif",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.3268px",
              }}
              variants={headingContainer}
              initial="hidden"
              animate="show"
            >
              {HEADING_LINES.map((line, index) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    style={{
                      transformOrigin: "center bottom",
                      transformPerspective: 800,
                      ...(index === 2
                        ? {
                            backgroundImage: HEADING_GRADIENT,
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                          }
                        : {}),
                    }}
                    variants={lineVariants}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
            </motion.div>
            </motion.div>
          </div>

          {/* Subtext + CTAs */}
          <motion.div
            className="absolute"
            style={{
              top: 466,
              left: "calc(68.75% - 7px)",
              right: 34,
              ...(parallaxOn ? { x: subX, y: subY } : {}),
            }}
          >
          <motion.div
            className="flex flex-col items-start gap-[35px]"
            style={reduce ? undefined : subtextDrift}
          >
            <motion.p
              className="text-[18px] font-normal leading-[1.5] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
              variants={subtextVariants}
              initial="hidden"
              animate="show"
            >
              Kami pelajari cara kerja bisnis Anda untuk merancang sistem yang benar-benar bisa
              diandalkan.
            </motion.p>
            <motion.div
              className="flex items-start gap-[12px]"
              variants={ctaContainer}
              initial="hidden"
              animate="show"
            >
              <motion.a
                href="/assessment"
                className="relative flex items-center justify-center gap-[8px] overflow-clip rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  border: "1px solid #a50000",
                  backgroundImage: "linear-gradient(180deg, #9e1515 0%, #b61718 100%)",
                  boxShadow:
                    "inset 0px 4px 4px 0px rgba(255,200,200,0.25), inset -2px -3px 6.119px 1px rgba(255,200,200,0.2)",
                  transformPerspective: 800,
                }}
                variants={ctaItem}
              >
                <span className="relative">Temukan Solusinya</span>
                <ArrowRightIcon size={16} className="relative text-white" />
              </motion.a>
              <motion.a
                href="#portofolio"
                className="relative flex items-center justify-center gap-[8px] overflow-clip rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px]"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  color: "#080c14",
                  border: "1px solid #e6e8eb",
                  backgroundImage: "linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)",
                  boxShadow: "inset -0.907px 0.907px 6.119px 0px rgba(130,186,255,0.2)",
                  transformPerspective: 800,
                }}
                variants={ctaItem}
              >
                Lihat Portofolio
              </motion.a>
            </motion.div>
          </motion.div>
          </motion.div>

          {/* Floating card — social proof */}
          <motion.div
            className="absolute"
            style={{
              top: 601,
              left: "calc(6.25% + 75px)",
              ...(parallaxOn ? { x: trustX, y: trustY } : {}),
            }}
          >
            <motion.div
              style={{ transformPerspective: 1000 }}
              variants={trustCardVariants}
              initial="hidden"
              animate="show"
            >
            <motion.div
              className="flex flex-col items-start rounded-[24px] p-[12px]"
              style={reduce ? GLASS_CARD : { ...GLASS_CARD, ...trustFloat }}
            >
              <div className="flex items-center gap-[16px]">
                <div className="flex items-center">
                  {AVATARS.map((src) => (
                    <div
                      key={src}
                      className="relative mr-[-16px] size-[52px] shrink-0 overflow-hidden rounded-full"
                      style={{ border: "1.625px solid #232426" }}
                    >
                      <Image src={src} alt="" fill sizes="52px" className="object-cover" />
                    </div>
                  ))}
                  <div
                    className="relative flex size-[52px] shrink-0 items-center justify-center overflow-clip rounded-full"
                    style={{ backgroundColor: "#0a0a0a", border: "1.625px solid #232426" }}
                  >
                    <span
                      className="text-[16px] font-semibold leading-[1.4] text-white"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      +24
                    </span>
                  </div>
                </div>
                <div className="h-[40px] w-px" style={{ backgroundColor: "#232426" }} />
                <div
                  className="flex flex-col gap-[4px] whitespace-nowrap text-[16px] leading-[1.4] text-white"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  <p className="font-bold">Dipercaya oleh 17+ bisnis</p>
                  <p className="font-normal">dari berbagai industri</p>
                </div>
              </div>
            </motion.div>
            </motion.div>
          </motion.div>

          {/* Portfolio preview strip — disembunyikan sementara via SHOW_PORTFOLIO_PREVIEW */}
          {SHOW_PORTFOLIO_PREVIEW && (
            <div className="absolute left-1/2 h-[376px] w-[1047px] -translate-x-1/2 overflow-clip rounded-[32px]" style={{ top: 708 }}>
              <motion.div
                className="flex h-full w-full items-center gap-[12px] rounded-[32px] p-[20px]"
                style={{ backgroundColor: "rgba(20,20,20,0.2)" }}
                variants={stripContainer}
                initial="hidden"
                animate="show"
              >
                {PORTFOLIO_CARDS.map((card) => (
                  <PortfolioCard key={card.image} card={card} variants={stripCardVariants} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
