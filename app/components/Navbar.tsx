"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ChevronDownIcon, PhoneIcon } from "./hero/icons";
import { EASE } from "./hero/motion";
import { waHref } from "../lib/whatsapp";

const CONTACT_HREF = waHref([
  "Halo Ranovate,",
  "",
  "Saya ingin menghubungi tim Ranovate untuk menanyakan lebih lanjut mengenai layanan Anda.",
  "",
  "Terima kasih.",
]);

type NavLink = {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
  dropdown?: { label: string; href: string }[];
};

const SERVICE_LINKS = [
  { label: "Web Development", href: "/layanan/website-development" },
  { label: "AI Integration", href: "/layanan/ai-integration" },
];

const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/", match: (p) => p === "/" },
  {
    label: "Layanan Kami",
    href: "/layanan/website-development",
    match: (p) => p.startsWith("/layanan"),
    dropdown: SERVICE_LINKS,
  },
  { label: "Tentang Kami", href: "/about", match: (p) => p === "/about" },
];

const ACTIVE_STYLE: CSSProperties = {
  backgroundColor: "#420909",
  color: "#de1d1e",
  fontWeight: 700,
  fontFamily: "var(--font-inter), sans-serif",
};

const INACTIVE_STYLE: CSSProperties = {
  color: "#ffffff",
  fontWeight: 400,
  fontFamily: "var(--font-inter), sans-serif",
};

function Logo() {
  return (
    <Link href="/" aria-label="Ranovate" className="relative block aspect-[286/67] w-[200px] shrink-0 lg:w-[286px]">
      <span className="absolute inset-[0_75.47%_0.15%_0]">
        <Image src="/images/hero/logo-mark.svg" alt="" fill priority sizes="80px" />
      </span>
      <span className="absolute inset-[43.4%_0_0_26.01%]">
        <Image src="/images/hero/logo-word.svg" alt="" fill priority sizes="220px" />
      </span>
    </Link>
  );
}

function ContactButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CONTACT_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex cursor-pointer items-center justify-center gap-[8px] overflow-clip rounded-[12px] px-[16px] py-[14px] text-[16px] font-semibold leading-[20px] text-white transition-colors hover:brightness-110 ${className}`}
      style={{ backgroundColor: "#9e1515", fontFamily: "var(--font-inter), sans-serif" }}
    >
      Hubungi Kami
      <PhoneIcon size={16} className="text-white" />
    </a>
  );
}

function DesktopLink({ link, active }: { link: NavLink; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link
        href={link.href}
        className="flex items-center gap-[6px] rounded-[16px] px-[12px] py-[8px] text-[16px] leading-[1.4] transition-colors"
        style={active ? ACTIVE_STYLE : INACTIVE_STYLE}
      >
        {active && <span className="size-[6px] shrink-0 rounded-full" style={{ backgroundColor: "#de1d1e" }} />}
        {!active && (
          <span className="block size-[6px] shrink-0 rounded-full transition-colors" style={{ backgroundColor: hovered ? "#9e1515" : "transparent" }} />
        )}
        {link.label}
        {link.dropdown && (
          <ChevronDownIcon
            size={16}
            className={`transition-transform duration-200 ${hovered ? "rotate-180" : ""}`}
          />
        )}
      </Link>

      <AnimatePresence>
        {hovered && link.dropdown && (
          <motion.div
            className="absolute left-0 top-full z-40 pt-[10px]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            <div
              className="flex w-[230px] flex-col gap-[4px] rounded-[16px] p-[8px]"
              style={{ backgroundColor: "#141414", border: "1px solid #232426", boxShadow: "0 20px 40px -16px rgba(0,0,0,0.6)" }}
            >
              {link.dropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[12px] px-[12px] py-[10px] text-[15px] leading-[1.4] text-white transition-colors hover:bg-[#420909] hover:text-[#de1d1e]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.2,
      },
    },
  };

  const item: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: -18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      };

  return (
    <nav className="relative z-30 w-full">
      <motion.div
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[24px] py-[20px] md:px-[48px] lg:px-[100px]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="shrink-0">
          <Logo />
        </motion.div>

        <motion.div variants={item} className="hidden items-center justify-center lg:flex">
          {NAV_LINKS.map((link) => (
            <DesktopLink key={link.label} link={link} active={link.match(pathname)} />
          ))}
        </motion.div>

        <motion.div variants={item} className="hidden lg:flex">
          <ContactButton />
        </motion.div>

        <motion.button
          variants={item}
          type="button"
          aria-label="Buka menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex size-[44px] items-center justify-center rounded-[12px] lg:hidden"
          style={{ backgroundColor: "#420909" }}
        >
          <span className="relative flex h-[14px] w-[20px] flex-col justify-between">
            <span
              className="block h-[2px] w-full rounded-full transition-transform"
              style={{ backgroundColor: "#ffffff", transform: open ? "translateY(6px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-[2px] w-full rounded-full transition-opacity"
              style={{ backgroundColor: "#ffffff", opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-[2px] w-full rounded-full transition-transform"
              style={{ backgroundColor: "#ffffff", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }}
            />
          </span>
        </motion.button>
      </motion.div>

      {open && (
        <div className="px-[24px] pb-[20px] md:px-[48px] lg:hidden">
          <div
            className="flex flex-col gap-[4px] rounded-[16px] p-[12px]"
            style={{ backgroundColor: "#141414", border: "1px solid #232426" }}
          >
            {NAV_LINKS.map((link) => {
              const active = link.match(pathname);
              if (link.dropdown) {
                return (
                  <div key={link.label} className="flex flex-col gap-[4px]">
                    <button
                      type="button"
                      onClick={() => setMobileServices((v) => !v)}
                      aria-expanded={mobileServices}
                      className="flex items-center justify-between gap-[6px] rounded-[12px] px-[12px] py-[10px] text-[16px] leading-[1.4]"
                      style={active ? ACTIVE_STYLE : INACTIVE_STYLE}
                    >
                      <span className="flex items-center gap-[6px]">
                        {active && <span className="size-[6px] shrink-0 rounded-full" style={{ backgroundColor: "#de1d1e" }} />}
                        {link.label}
                      </span>
                      <ChevronDownIcon size={16} className={`transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`} />
                    </button>
                    {mobileServices && (
                      <div className="flex flex-col gap-[2px] pl-[12px]">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="rounded-[12px] px-[12px] py-[8px] text-[15px] leading-[1.4] text-white transition-colors hover:bg-[#420909] hover:text-[#de1d1e]"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-[6px] rounded-[12px] px-[12px] py-[10px] text-[16px] leading-[1.4]"
                  style={active ? ACTIVE_STYLE : INACTIVE_STYLE}
                >
                  {active && <span className="size-[6px] shrink-0 rounded-full" style={{ backgroundColor: "#de1d1e" }} />}
                  {link.label}
                </Link>
              );
            })}
            <ContactButton className="mt-[4px] w-full" />
          </div>
        </div>
      )}
    </nav>
  );
}
