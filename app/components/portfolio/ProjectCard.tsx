import { type CSSProperties } from "react";
import Image from "next/image";
import { ArrowTopRightIcon } from "./icons";

const TAG_GRADIENT = "linear-gradient(99.07deg, #9e1515 31.9%, #ff6f00 104.6%)";

const MASK_STYLE: CSSProperties = {
  maskImage: "url('/images/portfolio/mask.svg')",
  WebkitMaskImage: "url('/images/portfolio/mask.svg')",
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

export type Project = {
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
};

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const cardH = compact ? "h-[300px]" : "h-[398px]";
  const imgH = compact ? "h-[182px]" : "h-[245px]";
  const arrow = compact ? "size-[44px]" : "size-[60px]";
  const arrowIcon = compact ? 30 : 40;
  const metaSize = compact ? "text-[14px]" : "text-[16px]";
  const titleSize = compact ? "text-[19px]" : "text-[24px]";
  const titleLh = compact ? "26px" : "32px";
  const descSize = compact ? "text-[13px]" : "text-[16px]";

  return (
    <div className={`group flex w-full flex-col justify-end ${compact ? "gap-[16px]" : "gap-[20px]"} ${cardH}`}>
      <div className={`relative w-full shrink-0 ${imgH}`}>
        <div className="absolute inset-0 overflow-hidden" style={MASK_STYLE}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 400px, 90vw"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
          />
        </div>
        <div
          className={`absolute bottom-0 right-[3.4%] flex items-center justify-center rounded-full transition-all duration-300 ease-out group-hover:scale-110 group-hover:brightness-110 ${arrow}`}
          style={{ backgroundColor: "#9e1515" }}
        >
          <ArrowTopRightIcon
            size={arrowIcon}
            className="text-white transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-[6px] px-[12px]">
        <div className={`flex w-full items-center justify-between whitespace-nowrap ${metaSize}`}>
          <span
            style={{
              backgroundImage: TAG_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontFamily: "var(--font-inter), sans-serif",
              letterSpacing: "-0.576px",
            }}
          >
            {project.category}
          </span>
          <span style={{ color: "#b8b8b8", fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-0.576px" }}>
            {project.date}
          </span>
        </div>
        <p
          className={`w-full font-medium text-white ${titleSize}`}
          style={{ fontFamily: "var(--font-host-grotesk), sans-serif", lineHeight: titleLh, letterSpacing: "0.216px" }}
        >
          {project.title}
        </p>
        <p
          className={`w-full font-normal ${descSize}`}
          style={{ color: "#b8b8b8", fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-0.576px", lineHeight: "normal" }}
        >
          {project.description}
        </p>
      </div>
    </div>
  );
}
