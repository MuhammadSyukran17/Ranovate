export const WA_NUMBER = "6282113788471";

export function waHref(lines: string[]): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
