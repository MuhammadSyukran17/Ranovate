"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { EASE } from "../hero/motion";
import { ArrowRightIcon } from "../hero/icons";
import { QUESTIONS } from "../../assessment/questions";

const HEADING_GRADIENT =
  "radial-gradient(60% 130% at 50% 50%, #ff9710 2%, #ffb14c 39%, #ffe5c3 75%, #ffffff 100%)";

const ANSWERS_KEY = "ranovate-assessment";

type Answers = Record<string, string[]>;

function SelectionIndicator({ checked, single }: { checked: boolean; single: boolean }) {
  return (
    <span
      className="flex size-[28px] shrink-0 items-center justify-center transition-colors duration-200"
      style={{
        borderRadius: single ? "9999px" : "8px",
        backgroundColor: checked ? "#9e1515" : "transparent",
        border: checked ? "1px solid #9e1515" : "1px solid #3a3b3e",
      }}
    >
      {checked &&
        (single ? (
          <span className="size-[10px] rounded-full bg-white" />
        ) : (
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ))}
    </span>
  );
}

function clampStep(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), QUESTIONS.length - 1);
}

function parseValues(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(",").map((value) => value.trim()).filter(Boolean);
}

export default function AssessmentFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const reduce = useReducedMotion() ?? false;
  const total = QUESTIONS.length;

  const [step, setStep] = useState(() => clampStep(parseInt(params.get("step") ?? "0", 10)));
  const [answers, setAnswers] = useState<Answers>(() => {
    const initial: Answers = {};
    QUESTIONS.forEach((question, index) => {
      const values = parseValues(params.get(`q${index}`));
      if (values.length > 0) initial[question.code] = values;
    });
    return initial;
  });

  const question = QUESTIONS[step];
  const percent = Math.round(((step + 1) / total) * 100);
  const selected = answers[question.code] ?? [];

  function syncUrl(nextStep: number, nextAnswers: Answers) {
    const sp = new URLSearchParams();
    sp.set("step", String(nextStep));
    QUESTIONS.forEach((q, index) => {
      const values = nextAnswers[q.code];
      if (values && values.length > 0) sp.set(`q${index}`, values.join(","));
    });
    router.replace(`/assessment/mulai?${sp.toString()}`, { scroll: false });
  }

  function applyState(nextStep: number, nextAnswers: Answers) {
    setStep(nextStep);
    setAnswers(nextAnswers);
    syncUrl(nextStep, nextAnswers);
  }

  function toggle(value: string) {
    const current = selected;
    let nextValues: string[];
    if (question.selection === "single") {
      nextValues = current.includes(value) ? [] : [value];
    } else {
      nextValues = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
    }
    const nextAnswers: Answers = { ...answers, [question.code]: nextValues };
    if (nextValues.length === 0) delete nextAnswers[question.code];
    setAnswers(nextAnswers);
    syncUrl(step, nextAnswers);
  }

  function advance() {
    if (step + 1 < total) {
      applyState(step + 1, answers);
    } else {
      try {
        sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
      } catch {}
      router.push("/assessment/hasil");
    }
  }

  function back() {
    if (step === 0) {
      router.push("/assessment");
    } else {
      applyState(step - 1, answers);
    }
  }

  const slide: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
        exit: { opacity: 0, y: -16, filter: "blur(8px)", transition: { duration: 0.25, ease: EASE } },
      };

  return (
    <section
      className="relative w-full overflow-hidden px-6 pb-24 pt-[140px] sm:px-10 lg:px-[100px]"
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

      <div className="relative z-[1] mx-auto flex w-full max-w-[1240px] flex-col gap-[40px]">
        <div className="flex flex-col gap-[8px]">
          <p
            className="text-[14px] leading-[24px]"
            style={{ color: "#808287", fontFamily: "var(--font-host-grotesk), sans-serif" }}
          >
            Pertanyaan {step + 1} dari {total}
          </p>
          <div className="flex items-center gap-[10px]">
            <div className="h-[8px] flex-1 overflow-hidden rounded-full" style={{ backgroundColor: "#eff6ff" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundImage: "linear-gradient(to right, #de1d1e, #781010)" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
              />
            </div>
            <span
              className="text-[14px] font-medium leading-[21px] text-white"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {percent}%
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slide}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col gap-[40px]"
          >
            <div className="flex flex-col">
              <p
                className="text-[16px] leading-[1.5]"
                style={{ color: "#de1d1e", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {question.code}
              </p>
              <h1
                className="text-[32px] leading-[1.3] text-white sm:text-[42px] lg:text-[52px]"
                style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 600, letterSpacing: "-0.25px" }}
              >
                {question.lead}
                <span
                  style={{
                    backgroundImage: HEADING_GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {question.highlight}
                </span>
              </h1>
              <p
                className="text-[16px] leading-[1.5] sm:text-[18px]"
                style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {question.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-[16px] sm:gap-[24px]">
              {question.options.map((option) => {
                const active = selected.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    role={question.selection === "single" ? "radio" : "checkbox"}
                    aria-checked={active}
                    onClick={() => toggle(option.value)}
                    className="flex w-full cursor-pointer items-center gap-[12px] rounded-[16px] p-[20px] text-left transition-colors duration-200"
                    style={{
                      backgroundColor: active ? "rgba(87,12,12,0.35)" : "rgba(20,20,20,0.2)",
                      border: `1px solid ${active ? "#a50000" : "#232426"}`,
                    }}
                  >
                    <SelectionIndicator checked={active} single={question.selection === "single"} />
                    <span
                      className="text-[16px] leading-[1.4] text-white"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-[12px]">
              <button
                type="button"
                onClick={back}
                className="flex cursor-pointer items-center justify-center gap-[8px] rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white transition-colors duration-200 hover:brightness-110"
                style={{ backgroundColor: "#141414", border: "1px solid #232426", fontFamily: "var(--font-inter), sans-serif" }}
              >
                <ArrowRightIcon size={16} className="rotate-180 text-white" />
                Kembali
              </button>
              <button
                type="button"
                onClick={advance}
                className="flex cursor-pointer items-center justify-center gap-[8px] rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white transition-colors duration-200 hover:brightness-110"
                style={{ backgroundColor: "#570c0c", border: "1px solid #a50000", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {selected.length > 0 ? "Selanjutnya" : "Lewati pertanyaan ini"}
                <ArrowRightIcon size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
