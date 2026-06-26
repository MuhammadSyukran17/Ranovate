"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE, EASE_BACK } from "../../hero/motion";

const STAGE_WIDTH = 1440;

const VIEWPORT = { once: true, amount: 0.3 } as const;

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.45 } },
};

const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const cardVariants: Variants = {
  hidden: (dir: number) => ({
    opacity: 0,
    y: 70,
    scale: 0.92,
    rotateX: 14,
    rotateY: dir * 7,
    filter: "blur(14px)",
  }),
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    filter: "blur(0px)",
    transition: { duration: 1.15, ease: EASE, opacity: { duration: 0.6 }, filter: { duration: 0.8 } },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 1.2, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: EASE } },
};

const iconVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0, rotate: -14 },
  show: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.7, ease: EASE_BACK, delay: 0.15 } },
};

const tagsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } },
};

const tagItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_BACK } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE, delay: 0.25 } },
};

const headerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};

const glowVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.8, ease: EASE } },
};

const CARD_GRADIENT =
  "linear-gradient(180deg, rgba(158,21,21,0.525) 0%, rgba(222,29,30,0) 43.284%), linear-gradient(90deg, #141414 0%, #141414 100%)";

const IMAGE_OVERLAY =
  "linear-gradient(180deg, rgba(0,0,0,0.14) 50.233%, rgba(0,0,0,0.7) 100%)";

type Tag = { label: string; icon: string };

export type Benefit = {
  icon: string;
  bg: string;
  tags: Tag[];
  title: string;
  desc: string;
};

const DEFAULT_BENEFITS: Benefit[] = [
  {
    icon: "/images/services/website/benefits/icons/main-1.svg",
    bg: "/images/services/website/benefits/bg-1.webp",
    tags: [
      { label: "Business Discovery", icon: "/images/services/website/benefits/icons/business-discovery.svg" },
      { label: "PRD", icon: "/images/services/website/benefits/icons/prd.svg" },
    ],
    title: "Kebutuhan bisnis Anda terdefinisi dengan jelas",
    desc: "Sebelum kami membangun apapun, kami bantu Anda mendefinisikan kebutuhan bisnis secara mendalam dan terdokumentasi dalam PRD. Anda pegang dokumennya, dan semua yang kami bangun mengacu pada itu.",
  },
  {
    icon: "/images/services/website/benefits/icons/main-2.svg",
    bg: "/images/services/website/benefits/bg-2.webp",
    tags: [
      { label: "UI/UX Design Custom", icon: "/images/services/website/benefits/icons/uiux.svg" },
      { label: "Brand-consistent", icon: "/images/services/website/benefits/icons/brand.svg" },
      { label: "Typography & Color System", icon: "/images/services/website/benefits/icons/typography.svg" },
    ],
    title: "Tampilan yang mencerminkan kualitas bisnis Anda",
    desc: "Bukan template yang dipakai ratusan bisnis lain. Setiap elemen visual dirancang khusus untuk bisnis dan audiens Anda.",
  },
  {
    icon: "/images/services/website/benefits/icons/main-3.svg",
    bg: "/images/services/website/benefits/bg-3.webp",
    tags: [
      { label: "SEO-ready", icon: "/images/services/website/benefits/icons/seo.svg" },
      { label: "Page Speed Optimized", icon: "/images/services/website/benefits/icons/pagespeed.svg" },
      { label: "Meta & Structure", icon: "/images/services/website/benefits/icons/meta.svg" },
    ],
    title: "Bisnis Anda ditemukan oleh orang yang tepat, di waktu yang tepat",
    desc: "Dioptimasi untuk mesin pencari sejak awal, bukan sebagai tambahan belakangan. Calon klien yang mencari solusi seperti milik Anda, menemukan Anda duluan.",
  },
  {
    icon: "/images/services/website/benefits/icons/main-4.svg",
    bg: "/images/services/website/benefits/bg-4.webp",
    tags: [
      { label: "Responsive Design", icon: "/images/services/website/benefits/icons/responsive.svg" },
      { label: "Mobile-first", icon: "/images/services/website/benefits/icons/mobile.svg" },
      { label: "Cross-browser Compatible", icon: "/images/services/website/benefits/icons/crossbrowser.svg" },
    ],
    title: "Pengalaman yang sama baiknya, di perangkat apapun",
    desc: "Calon klien Anda mengakses dari mana saja dan kapan saja. Website Anda tampil dan bekerja dengan sempurna di setiap layar tanpa terkecuali.",
  },
  {
    icon: "/images/services/website/benefits/icons/main-5.svg",
    bg: "/images/services/website/benefits/bg-1.webp",
    tags: [
      { label: "Scalable Architecture", icon: "scalable" },
      { label: "CMS Integration", icon: "/images/services/website/benefits/icons/cms.svg" },
      { label: "Future-ready", icon: "/images/services/website/benefits/icons/futureready.svg" },
    ],
    title: "Sistem yang siap berkembang seiring ambisi bisnis Anda",
    desc: "Dirancang untuk tumbuh bersama bisnis Anda, ke fitur baru, otomasi, hingga AI, tanpa harus membangun ulang dari awal.",
  },
  {
    icon: "/images/services/website/benefits/icons/main-4.svg",
    bg: "/images/services/website/benefits/bg-5.webp",
    tags: [
      { label: "Post-launch Support", icon: "/images/services/website/benefits/icons/support.svg" },
      { label: "Training", icon: "/images/services/website/benefits/icons/training.svg" },
      { label: "Maintenance", icon: "/images/services/website/benefits/icons/maintenance.svg" },
    ],
    title: "Kami tetap hadir setelah website Anda digunakan.",
    desc: "Peluncuran bukan akhir dari tanggung jawab kami. Kami dampingi sampai Anda benar-benar bisa mengelola dan mengandalkan website Anda.",
  },
];

function ScalableIcon() {
  return (
    <span className="relative block size-[16px]">
      <span className="absolute" style={{ inset: "65.6% 9.33% 6.25% 9.54%" }}>
        <Image src="/images/services/website/benefits/icons/scalable-1.svg" alt="" fill sizes="16px" />
      </span>
      <span className="absolute" style={{ inset: "46.85% 9.33% 25% 9.54%" }}>
        <Image src="/images/services/website/benefits/icons/scalable-2.svg" alt="" fill sizes="16px" />
      </span>
      <span className="absolute" style={{ inset: "6.25% 9.36% 43.75% 9.39%" }}>
        <Image src="/images/services/website/benefits/icons/scalable-3.svg" alt="" fill sizes="16px" />
      </span>
    </span>
  );
}

function TagPill({ tag }: { tag: Tag }) {
  return (
    <motion.span
      variants={tagItem}
      className="flex h-[32px] items-center gap-[6px] rounded-[12px] p-[6px]"
      style={{ backgroundColor: "rgba(0,0,0,0.32)" }}
    >
      <span className="flex items-center rounded-[6px] p-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
        {tag.icon === "scalable" ? (
          <ScalableIcon />
        ) : (
          <span className="relative block size-[14px]">
            <Image src={tag.icon} alt="" fill sizes="14px" />
          </span>
        )}
      </span>
      <span
        className="whitespace-nowrap text-[13px] font-normal leading-[1.4] text-white"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {tag.label}
      </span>
    </motion.span>
  );
}

function BenefitCard({ benefit, dir, reduce }: { benefit: Benefit; dir: number; reduce: boolean }) {
  return (
    <motion.article
      variants={reduce ? fade : cardVariants}
      custom={dir}
      className="relative flex h-[372px] flex-col justify-end gap-[16px] overflow-clip rounded-[20px] p-[20px]"
      style={{
        backgroundImage: CARD_GRADIENT,
        border: "1px solid rgba(255,255,255,0.5)",
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        transformOrigin: "center 85%",
        willChange: "transform",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[372px] w-[620px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
        <motion.div className="absolute inset-0" variants={reduce ? fade : imageVariants}>
          <Image
            src={benefit.bg}
            alt=""
            fill
            sizes="(min-width: 1440px) 50vw, 620px"
            loading="lazy"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ backgroundImage: IMAGE_OVERLAY }} />
      </div>

      <motion.div
        variants={reduce ? fade : iconVariants}
        className="relative flex size-[56px] items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(0,0,0,0.24)" }}
      >
        <span className="relative block size-[28px]">
          <Image src={benefit.icon} alt="" fill sizes="28px" />
        </span>
      </motion.div>

      <div className="relative flex flex-col gap-[6px]">
        <motion.div className="flex flex-wrap gap-[8px]" variants={reduce ? fade : tagsContainer}>
          {benefit.tags.map((tag) => (
            <TagPill key={tag.label} tag={tag} />
          ))}
        </motion.div>
        <motion.h3
          variants={reduce ? fade : textItem}
          className="text-[19px] leading-[1.25] text-white"
          style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 500, letterSpacing: "-0.25px" }}
        >
          {benefit.title}
        </motion.h3>
        <motion.p
          variants={reduce ? fade : textItem}
          className="text-[14px] font-normal leading-[1.5] text-white"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {benefit.desc}
        </motion.p>
      </div>
    </motion.article>
  );
}

type BenefitsSectionProps = {
  badge?: string;
  titleLead?: string;
  titleAccent?: string;
  subtitle?: string;
  benefits?: Benefit[];
};

export default function BenefitsSection({
  badge = "Mengapa memilih kami",
  titleLead = "Bukan sekadar website yang bagus ",
  titleAccent = "Website yang bekerja untuk bisnis Anda",
  subtitle = "Setiap elemen dirancang dengan tujuan yang jelas, mencerminkan kualitas bisnis Anda dan mendorong calon klien untuk mengambil langkah berikutnya.",
  benefits = DEFAULT_BENEFITS,
}: BenefitsSectionProps = {}) {
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

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: -620, top: -360, width: 1907.001, height: 1317.705, zIndex: 0 }}
        variants={reduce ? fade : glowVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <div className="absolute" style={{ top: "-11.33%", bottom: "-11.33%", left: "-7.72%", right: 0 }}>
          <Image src="/images/services/website/benefits/glow.svg" alt="" fill sizes="1907px" className="object-fill" />
        </div>
      </motion.div>
      <div ref={wrapperRef} className="relative z-[1] w-full" style={{ height }}>
        <div
          ref={innerRef}
          className="absolute left-1/2 top-0 flex flex-col items-center gap-[40px] px-[180px] py-[80px]"
          style={{ width: STAGE_WIDTH, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
        >
          <motion.div
            className="relative flex w-[960px] flex-col items-center gap-[24px]"
            variants={headerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div
              variants={reduce ? fade : headerItem}
              className="flex items-center gap-[6px] rounded-[16px] p-[8px]"
              style={{ backgroundColor: "#0a0a0a", border: "1px solid #232426" }}
            >
              <span className="flex items-center rounded-[8px] p-[4px]" style={{ backgroundColor: "#de1d1e" }}>
                <span className="relative block size-[16px]">
                  <Image src="/images/services/badge.svg" alt="" fill sizes="16px" />
                </span>
              </span>
              <span
                className="text-[16px] font-normal leading-[1.4]"
                style={{ color: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
              >
                {badge}
              </span>
            </motion.div>

            <motion.h2
              variants={reduce ? fade : headerItem}
              className="text-center text-[52px] leading-[1.3] text-white"
              style={{ fontFamily: "var(--font-host-grotesk), sans-serif", fontWeight: 600, letterSpacing: "-0.25px" }}
            >
              {titleLead}
              <span style={{ color: "#de1d1e" }}>{titleAccent}</span>
            </motion.h2>

            <motion.p
              variants={reduce ? fade : headerItem}
              className="max-w-[760px] text-center text-[18px] font-normal leading-[1.5]"
              style={{ color: "#808287", fontFamily: "var(--font-inter), sans-serif" }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid w-full grid-cols-2 gap-[24px]"
            variants={gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} dir={index % 2 === 0 ? -1 : 1} reduce={reduce} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
