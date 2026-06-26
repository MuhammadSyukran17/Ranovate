"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { EASE, EASE_BACK } from "./hero/motion";
import { FAQ_ITEMS as ITEMS, type FaqItem as Item } from "../lib/faq";

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-[24px] shrink-0" aria-hidden>
      <span
        className="absolute rounded-full"
        style={{ left: 3, top: 11, width: 18, height: 2, backgroundColor: "#9e1515" }}
      />
      <motion.span
        className="absolute rounded-full"
        style={{ left: 11, top: 3, width: 2, height: 18, backgroundColor: "#9e1515", transformOrigin: "center" }}
        animate={{ scaleY: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </span>
  );
}

function FaqRow({ item, open, onToggle, reduce }: { item: Item; open: boolean; onToggle: () => void; reduce: boolean }) {
  return (
    <div
      className="w-full rounded-[16px] p-[24px] transition-colors duration-300"
      style={{
        backgroundColor: open ? "rgba(0,0,0,0.28)" : "rgba(0,0,0,0.1)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-[16px] text-left"
      >
        <span
          className="min-w-0 flex-1 text-[20px] font-semibold leading-[1.4] text-white"
          style={{ fontFamily: "var(--font-host-grotesk), sans-serif" }}
        >
          {item.question}
        </span>
        <PlusIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="overflow-hidden"
          >
            <p
              className="pt-[12px] text-[18px] font-normal leading-[1.5]"
              style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(-1);
  const viewport = { once: true, amount: 0.2 } as const;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.16, delayChildren: reduce ? 0 : 0.08 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 70, scale: 0.93, filter: "blur(14px)" },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.9, ease: EASE_BACK, opacity: { duration: 0.5 }, filter: { duration: 0.6 } },
        },
      };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute rotate-180" style={{ left: "-19.44%", right: "-19.44%", top: "-5.42%", bottom: "5.52%" }}>
          <Image src="/images/faq/bg-lines.svg" alt="" fill sizes="140vw" className="object-cover" />
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center gap-[40px] px-[24px] py-[80px] md:px-[100px]">
        <motion.div
          className="flex w-full flex-col items-center gap-[8px]"
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
              FAQ
            </span>
          </motion.div>

          <motion.h2
            className="text-center text-[52px] leading-[1.2] text-white"
            style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
            variants={item}
          >
            FAQ
          </motion.h2>
        </motion.div>

        <motion.div
          className="flex w-full max-w-[1240px] flex-col gap-[20px]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {ITEMS.map((faq, index) => (
            <motion.div key={faq.question} variants={item}>
              <FaqRow
                item={faq}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                reduce={!!reduce}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
