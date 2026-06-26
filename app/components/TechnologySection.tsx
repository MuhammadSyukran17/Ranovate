"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type Variants,
} from "motion/react";
import { EASE } from "./hero/motion";

const wrapValue = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

type Logo = { src: string; width: number; height: number; alt: string };

const LOGOS: Logo[] = [
  { src: "/images/tech/logo-01.svg", width: 56.279, height: 63.797, alt: "Firebase" },
  { src: "/images/tech/logo-02.svg", width: 63.797, height: 63.797, alt: "Google Cloud" },
  { src: "/images/tech/logo-03.svg", width: 63.797, height: 63.797, alt: "MongoDB" },
  { src: "/images/tech/logo-04.png", width: 46.398, height: 63.797, alt: "MongoDB Leaf" },
  { src: "/images/tech/logo-05.svg", width: 29.867, height: 64, alt: "Angular" },
  { src: "/images/tech/logo-06.svg", width: 60.14, height: 63.781, alt: "Angular" },
  { src: "/images/tech/logo-07.png", width: 57.234, height: 63.594, alt: "Next.js" },
  { src: "/images/tech/logo-08.png", width: 56.528, height: 63.594, alt: "HTML5" },
  { src: "/images/tech/logo-09.png", width: 63.797, height: 63.797, alt: "React" },
  { src: "/images/tech/logo-10.svg", width: 73.377, height: 63.594, alt: "CSS3" },
  { src: "/images/tech/logo-11.svg", width: 73.346, height: 43.886, alt: "Tailwind CSS" },
  { src: "/images/tech/logo-12.svg", width: 56.686, height: 63.71, alt: "C++" },
  { src: "/images/tech/logo-13.png", width: 52.825, height: 63.797, alt: "SQL" },
  { src: "/images/tech/logo-14.svg", width: 42.531, height: 63.797, alt: "Figma" },
  { src: "__photoshop__", width: 65.433, height: 63.797, alt: "Photoshop" },
  { src: "/images/tech/logo-16.svg", width: 65.433, height: 63.797, alt: "Illustrator" },
  { src: "/images/tech/logo-17.svg", width: 63.594, height: 63.594, alt: "Framer" },
];

const MARQUEE_MASK =
  "linear-gradient(90deg, transparent 0%, #000 11%, #000 89%, transparent 100%)";

function LogoMark({ logo, reduce }: { logo: Logo; reduce: boolean }) {
  const inner =
    logo.src === "__photoshop__" ? (
      <>
        <Image src="/images/tech/ps-square.svg" alt={logo.alt} fill sizes="66px" className="object-contain" />
        <div className="absolute" style={{ left: 14.72, top: 16.22, width: 39.371, height: 29.445 }}>
          <Image src="/images/tech/ps-mark.svg" alt="" fill sizes="40px" className="object-contain" />
        </div>
      </>
    ) : (
      <Image src={logo.src} alt={logo.alt} fill sizes="80px" className="object-contain" />
    );

  return (
    <motion.div
      className="group relative shrink-0"
      style={{ width: logo.width, height: logo.height }}
      whileHover={reduce ? undefined : { scale: 1.22, y: -8 }}
      transition={{ type: "spring", stiffness: 320, damping: 17, mass: 0.6 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, rgba(158,21,21,0.6) 0%, rgba(158,21,21,0) 70%)" }}
      />
      <div
        className="relative h-full w-full opacity-70 transition-[opacity,filter] duration-300 group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_10px_rgba(255,255,255,0.28))]"
      >
        {inner}
      </div>
    </motion.div>
  );
}

export default function TechnologySection() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.3 } as const;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.05 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
      };

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1600, 1600], [7, -7], { clamp: true });
  const x = useTransform(baseX, (value) => `${wrapValue(-50, 0, value)}%`);
  const directionRef = useRef(-1);
  const hoverRef = useRef(1);
  const hoverTargetRef = useRef(1);

  useAnimationFrame((t, delta) => {
    if (reduce) return;
    hoverRef.current += (hoverTargetRef.current - hoverRef.current) * Math.min(1, delta / 140);
    let moveBy = directionRef.current * 1.7 * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionRef.current = -1;
    else if (vf > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * vf;
    moveBy *= hoverRef.current;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="flex w-full flex-col items-center gap-[40px] py-[80px]">
        <motion.div
          className="flex w-full flex-col items-center gap-[8px] px-[24px]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <motion.div
            className="flex items-center gap-[6px] rounded-[16px] p-[8px]"
            style={{ backgroundColor: "#0a0a0a", border: "1px solid #232426" }}
            variants={item}
          >
            <div className="flex items-center rounded-[8px] p-[4px]" style={{ backgroundColor: "#9e1515" }}>
              <div className="relative size-[16px]">
                <Image src="/images/tech/badge.svg" alt="" fill sizes="16px" />
              </div>
            </div>
            <span
              className="text-[16px] font-normal leading-[1.4]"
              style={{ color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
            >
              Teknologi
            </span>
          </motion.div>

          <motion.h2
            className="max-w-[640px] text-center text-[52px] leading-[1.2] text-white"
            style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
            variants={item}
          >
            Teknologi Terbaik untuk Setiap <span style={{ color: "#9e1515" }}>Solusi Bisnis Anda</span>
          </motion.h2>

          <motion.p
            className="max-w-[1078px] text-center text-[18px] font-normal leading-[1.5]"
            style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
            variants={item}
          >
            Mau menggunakan teknologi apa pun, kami siap mewujudkannya. Kami hadirkan solusi digital terbaik agar
            sistem bisnis Anda selalu gesit, aman, dan melaju tanpa hambatan
          </motion.p>
        </motion.div>

        <div
          className="relative w-full overflow-hidden"
          style={{ height: 108, maskImage: MARQUEE_MASK, WebkitMaskImage: MARQUEE_MASK }}
          onPointerEnter={() => {
            hoverTargetRef.current = reduce ? 1 : 0.12;
          }}
          onPointerLeave={() => {
            hoverTargetRef.current = 1;
          }}
        >
          <motion.div
            className="absolute left-0 top-0 flex h-full items-center will-change-transform"
            style={reduce ? undefined : { x, skewX }}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex h-full shrink-0 items-center gap-[64px] pr-[64px]"
                aria-hidden={copy === 1}
              >
                {LOGOS.map((logo, index) => (
                  <LogoMark key={`${logo.alt}-${index}`} logo={logo} reduce={!!reduce} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
