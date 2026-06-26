"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE } from "./hero/motion";
import { WA_NUMBER } from "../lib/whatsapp";

const BG_GRADIENT =
  "radial-gradient(50% 50% at 50% 50%, #9e1515 0%, #700f0f 50%, #420909 100%)";

type Social = { src: string; insetClass: string; label: string; href: string };

const SOCIALS: Social[] = [
  { src: "/images/footer/wa.svg", insetClass: "inset-[12.28%_11.1%_12.4%_13.9%]", label: "WhatsApp", href: `https://wa.me/${WA_NUMBER}` },
  { src: "/images/footer/ig.svg", insetClass: "inset-[13.64%]", label: "Instagram", href: "https://www.instagram.com/ranovate" },
  { src: "/images/footer/li.svg", insetClass: "inset-[14.58%]", label: "LinkedIn", href: "https://www.linkedin.com/company/ranovate" },
  { src: "/images/footer/tg.svg", insetClass: "inset-[23.01%_19.06%_19.98%_12.98%]", label: "Telegram", href: "https://t.me/ranovate" },
];

const NAV: { label: string; href: string }[] = [
  { label: "Home", href: "#beranda" },
  { label: "Our Service", href: "#" },
  { label: "About Us", href: "#" },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.35 } as const;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.22, delayChildren: reduce ? 0 : 0.08 } },
  };
  const subContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.18 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 48, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
      };
  const itemLeft: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, x: -80, filter: "blur(10px)" },
        show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
      };
  const itemRight: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, x: 80, filter: "blur(10px)" },
        show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
      };
  const bigReveal: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }
    : {
        hidden: { opacity: 0, y: 72, scale: 0.84, filter: "blur(26px)" },
        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: EASE } },
      };

  return (
    <footer className="relative w-full overflow-hidden" style={{ backgroundImage: BG_GRADIENT }}>
      <motion.div
        className="relative flex min-h-[480px] w-full flex-col justify-between"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -translate-y-1/2 select-none overflow-hidden"
          style={{ top: 316 }}
        >
          <motion.div variants={bigReveal}>
            <div className="animate-marquee-left flex w-max">
              {[0, 1].map((copy) => (
                <span
                  key={copy}
                  className="block shrink-0 whitespace-nowrap pr-[80px] text-[200px] font-black italic uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    letterSpacing: "-12px",
                    backgroundImage: "linear-gradient(90deg, #ffffff 0%, #9da0a4 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Let&rsquo;s Collaborate
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="relative z-10 flex w-full items-start justify-between px-[100px] py-[40px]" variants={subContainer}>
          <motion.div className="flex w-[359px] flex-col items-start gap-[22px]" variants={itemLeft}>
            <a href="#beranda" aria-label="Ranovate" className="relative block h-[56.305px] w-[240px] shrink-0">
              <span className="absolute inset-[0_75.47%_0.15%_0]">
                <Image src="/images/hero/logo-mark.svg" alt="" fill sizes="80px" />
              </span>
              <span className="absolute inset-[43.4%_0_0_26.01%]">
                <Image src="/images/hero/logo-word.svg" alt="" fill sizes="220px" />
              </span>
            </a>

            <p
              className="w-full text-[16px] leading-[1.3] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Where imagination meets innovation - unleash your creativity with us!
            </p>

            <div className="flex items-start gap-[16px]">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="relative block size-[24px] shrink-0 opacity-90 transition-opacity duration-200 hover:opacity-100"
                >
                  <span className={`absolute ${social.insetClass}`}>
                    <Image src={social.src} alt="" fill sizes="24px" />
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div className="flex flex-col items-start gap-[10px]" variants={itemRight}>
            <p
              className="text-[18px] font-medium leading-[1.3] text-white"
              style={{ fontFamily: "var(--font-host-grotesk), sans-serif" }}
            >
              Halaman
            </p>
            <div className="flex items-center gap-[10px]">
              {NAV.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap text-[16px] leading-[1.4] text-white transition-colors duration-200 hover:text-white/70"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 flex w-full items-center justify-between px-[100px] py-[40px] text-[16px] text-white"
          variants={item}
        >
          <p className="font-light leading-[1.3]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            © 2026 Ranovate. All rights reserved.
          </p>
          <div className="flex items-center gap-[12px]">
            <span className="leading-[1.3]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Powered by
            </span>
            <span className="font-medium leading-[1.3]" style={{ fontFamily: "var(--font-host-grotesk), sans-serif" }}>
              Ranovate
            </span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
