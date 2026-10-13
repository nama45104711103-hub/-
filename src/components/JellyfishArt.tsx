import { useId } from "react";

type Props = {
  /** かさの基本色。 */
  color: string;
  /** 触手や縁の差し色。 */
  accent: string;
  className?: string;
};

/** 色を受け取って、その色のクラゲを描く。写真は使わず図形だけで描画する。 */
export function JellyfishArt({ color, accent, className }: Props) {
  const id = useId();
  const bellId = `bell-${id}`;
  const glowId = `glow-${id}`;

  const tentacles = [22, 34, 46, 60, 74, 86, 98];

  return (
    <svg
      viewBox="0 0 120 168"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={bellId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="55%" stopColor={color} stopOpacity="0.98" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="68" r="56" fill={`url(#${glowId})`} />

      {tentacles.map((x, index) => (
        <path
          key={x}
          d={`M${x} 74 q${index % 2 === 0 ? -8 : 8} 26 ${index % 2 === 0 ? 4 : -4} 48 q${index % 2 === 0 ? 7 : -7} 20 ${index % 2 === 0 ? -3 : 3} 40`}
          fill="none"
          stroke={accent}
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}

      <path
        d="M30 78 q-6 30 2 48 q6 18 -2 34"
        fill="none"
        stroke={accent}
        strokeOpacity="0.8"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M48 82 q-4 32 2 50 q4 16 -2 30"
        fill="none"
        stroke={accent}
        strokeOpacity="0.85"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M72 82 q4 32 -2 50 q-4 16 2 30"
        fill="none"
        stroke={accent}
        strokeOpacity="0.85"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M90 78 q6 30 -2 48 q-6 18 2 34"
        fill="none"
        stroke={accent}
        strokeOpacity="0.8"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M11 72 C11 28 109 28 109 72 C99 85 93 71 82 82 C72 92 66 74 60 84 C54 74 48 92 38 82 C27 71 21 85 11 72 Z"
        fill={`url(#${bellId})`}
      />
      <path
        d="M11 72 C11 28 109 28 109 72 C99 85 93 71 82 82 C72 92 66 74 60 84 C54 74 48 92 38 82 C27 71 21 85 11 72 Z"
        fill="none"
        stroke={accent}
        strokeOpacity="0.9"
        strokeWidth="1.5"
      />
      <ellipse cx="42" cy="48" rx="16" ry="10" fill="#ffffff" fillOpacity="0.28" />
      <ellipse cx="74" cy="42" rx="7" ry="4" fill="#ffffff" fillOpacity="0.2" />
      <path
        d="M34 66 q26 12 52 0"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
