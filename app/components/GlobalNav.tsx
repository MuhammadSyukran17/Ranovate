"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function GlobalNav() {
  const pathname = usePathname();
  // Home renders its own Navbar inside HeroSection (over the hero glow), so skip it here.
  if (pathname === "/") return null;
  // Overlay so the first section's background/glow fills behind the transparent navbar.
  return (
    <div className="absolute inset-x-0 top-0 z-30">
      <Navbar />
    </div>
  );
}
