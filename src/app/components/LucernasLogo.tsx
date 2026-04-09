import { useState } from "react";

/**
 * LucernasLogo
 * -----------
 * Priority order:
 *  1. LUCERNAS_LOGO_URL env variable  (set in .env as VITE_LOGO_URL=https://...)
 *  2. /lucernas-logo.png              (drop any image into /public as lucernas-logo.png)
 *  3. Figma export URL                (paste your Figma image link as the `src` prop)
 *  4. Built-in SVG fallback           (always works, matches Lucernas brand colors)
 */

const ENV_URL = import.meta.env.VITE_LOGO_URL as string | undefined;
const PUBLIC_URL = "/lucernas-logo.png";

interface LucernasLogoProps {
  size?: number;
  /** Paste your Figma export URL here, e.g. https://figma-alpha-api.s3.us-west-2.amazonaws.com/... */
  src?: string;
  className?: string;
}

export function LucernasLogo({ size = 36, src, className = "" }: LucernasLogoProps) {
  // Resolve source: prop > env > public file
  const resolvedSrc = src || ENV_URL || PUBLIC_URL;
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <img
        src={resolvedSrc}
        alt="Lucernas logo"
        width={size}
        height={size}
        onError={() => setImgFailed(true)}
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // SVG fallback — Lucernas maroon flame on circle
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Lucernas logo"
    >
      <circle cx="18" cy="18" r="18" fill="hsl(355,70%,30%)" />
      {/* Flame */}
      <path
        d="M18 6 C15 11 11 13 11 18 a7 7 0 0 0 14 0 C25 13 21 11 18 6Z"
        fill="hsl(43,90%,70%)"
        opacity="0.9"
      />
      <path
        d="M18 10 C17 13 14 15 14 18 a4 4 0 0 0 8 0 C22 15 19 13 18 10Z"
        fill="white"
        opacity="0.85"
      />
    </svg>
  );
}
