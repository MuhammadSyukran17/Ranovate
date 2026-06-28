"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE } from "../hero/motion";
import { QUESTIONS } from "../../assessment/questions";
import { buildSummary, resolveSolution } from "../../assessment/solutions";

const ANSWERS_KEY = "ranovate-assessment";

const WA_NUMBER = "6282113788471";

function SparkleIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5L9.4 6.1L14 7.5L9.4 8.9L8 13.5L6.6 8.9L2 7.5L6.6 6.1L8 1.5Z"
        fill="#de1d1e"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path d="M6 4L10 8L6 12" stroke="#de1d1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z"
        stroke="white"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AssessmentResult() {
  const router = useRouter();
  const reduce = useReducedMotion() ?? false;
  const [answers, setAnswers] = useState<Record<string, string[]> | null>(null);

  useEffect(() => {
    let stored: Record<string, string[]> = {};
    try {
      stored = JSON.parse(sessionStorage.getItem(ANSWERS_KEY) ?? "{}");
    } catch {}
    if (!stored || Object.keys(stored).length === 0) {
      router.replace("/assessment");
      return;
    }
    setAnswers(stored);
  }, [router]);

  const solution = useMemo(() => (answers ? resolveSolution(answers) : null), [answers]);
  const summary = useMemo(() => (answers ? buildSummary(answers) : []), [answers]);

  const editHref = useMemo(() => {
    if (!answers) return "/assessment/mulai";
    const sp = new URLSearchParams();
    sp.set("step", "0");
    QUESTIONS.forEach((question, index) => {
      const values = answers[question.code];
      if (values && values.length > 0) sp.set(`q${index}`, values.join(","));
    });
    return `/assessment/mulai?${sp.toString()}`;
  }, [answers]);

  const waHref = useMemo(() => {
    if (!solution) return "#";
    const lines = [
      "Halo Ranovate,",
      "",
      "Saya baru menyelesaikan assessment di website dan tertarik untuk konsultasi lebih lanjut.",
      "",
      `Rekomendasi solusi: ${solution.title} (${solution.subtitle})`,
      "",
      "Ringkasan jawaban saya:",
      ...summary.map((row) => `- ${row.label}: ${row.value}`),
      "",
      "Boleh dibantu untuk diskusi langkah selanjutnya? Terima kasih.",
    ];
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [solution, summary]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section
      className="relative w-full overflow-hidden px-6 pb-24 pt-[140px] sm:px-10 lg:px-[80px]"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 hidden h-full w-[55%] lg:block">
        <Image
          src="/images/assessment/figure.png"
          alt=""
          fill
          sizes="55vw"
          className="object-contain object-right-top"
          style={{ maskImage: "linear-gradient(to left, #000 35%, transparent 92%)", WebkitMaskImage: "linear-gradient(to left, #000 35%, transparent 92%)" }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[600px] w-[900px]"
        style={{ background: "radial-gradient(50% 50% at 50% 100%, rgba(158,21,21,0.35) 0%, transparent 70%)" }}
      />

      {solution && (
        <motion.div
          className="relative z-[1] mx-auto flex w-full max-w-[600px] flex-col items-center gap-[40px]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-[6px] rounded-full px-[12px] py-[8px]"
            style={{ backgroundColor: "rgba(20,20,20,0.4)", border: "1px solid #232426" }}
          >
            <SparkleIcon />
            <span
              className="text-[16px] leading-[1.4] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Rekomendasi untuk anda.
            </span>
          </motion.div>

          <motion.div
            variants={item}
            className="flex w-full flex-col gap-[20px] overflow-clip rounded-[24px] p-[20px]"
            style={{ border: "1px solid #232426", backgroundColor: "rgba(10,10,10,0.4)" }}
          >
            <div className="flex items-center gap-[10px]">
              <div
                className="flex h-[62px] w-[68px] shrink-0 items-center justify-center rounded-[12px]"
                style={{ backgroundColor: "#420909" }}
              >
                <span className="relative block h-[38px] w-[40px]">
                  <Image src="/images/hero/logo-mark.svg" alt="" fill sizes="40px" />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-[10px]">
                <p
                  className="text-[24px] leading-[1.2] text-white"
                  style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
                >
                  {solution.title}
                </p>
                <p
                  className="text-[12px] leading-[1.2]"
                  style={{ color: "#808287", fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
                >
                  {solution.subtitle}
                </p>
              </div>
            </div>

            <p
              className="text-[14px] font-light leading-[1.5] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {solution.description}
            </p>

            <div className="h-px w-full" style={{ backgroundColor: "#232426" }} />

            <p
              className="text-[12px] leading-[1.2]"
              style={{ color: "#808287", fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
            >
              RINGKASAN JAWABAN ANDA
            </p>

            <div className="flex flex-col gap-[8px]">
              {summary.map((row) => (
                <div key={row.label} className="flex items-center gap-[8px]">
                  <ChevronIcon />
                  <p
                    className="text-[14px] font-medium leading-[1.5] text-white"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {row.label}:
                  </p>
                  <p
                    className="text-[14px] font-light leading-[1.5] text-white"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[8px]">
              <p
                className="text-[20px] font-medium leading-[1.5] text-white"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Tinggalkan Kontak, kami hubungi.
              </p>
              <p
                className="text-[14px] font-light leading-[1.5]"
                style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Kebutuhan seperti ini biasanya perlu kita diskusikan sebentar agar perkiraan biaya &amp; waktunya jujur. Konsultasi gratis.
              </p>
            </div>

            <div className="flex flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-end">
              <a
                href={editHref}
                className="flex flex-1 cursor-pointer items-center justify-center gap-[8px] rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white transition-colors duration-200 hover:brightness-110"
                style={{ backgroundColor: "#141414", border: "1px solid #232426", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Edit Jawaban
                <PencilIcon />
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 cursor-pointer items-center justify-center gap-[8px] rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white transition-colors duration-200 hover:brightness-110"
                style={{ backgroundColor: "#570c0c", border: "1px solid #a50000", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Kirim ke WhatsApp
                <span className="relative block size-[16px]">
                  <Image src="/images/footer/wa.svg" alt="" fill sizes="16px" />
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
