import { type FC, type ReactNode, useId } from "react";

interface PairIconProps {
  symbol: string;
  className?: string;
}

type IconDef = {
  viewBox: string;
  element: (idSuffix: string) => ReactNode;
};

const iconMap: Record<string, IconDef> = {
  // ──────────────── Forex half-flag icons ────────────────
  USDAUD: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <circle cx="16" cy="16" r="14" fill="#000" />
        <defs>
          <clipPath id={`hl-${s}`}>
            <rect x="2" y="2" width="14" height="28" rx="14" />
          </clipPath>
          <clipPath id={`hr-${s}`}>
            <rect x="16" y="2" width="14" height="28" rx="0" />
          </clipPath>
        </defs>
        {/* US left half */}
        <g clipPath={`url(#hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#002868" />
          <rect x="2" y="6" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="14" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="22" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="2" width="14" height="12" fill="#002868" opacity="0.85" />
          <circle cx="5" cy="5" r="0.5" fill="#fff" />
          <circle cx="8" cy="5" r="0.5" fill="#fff" />
          <circle cx="11" cy="5" r="0.5" fill="#fff" />
          <circle cx="6.5" cy="8" r="0.5" fill="#fff" />
          <circle cx="9.5" cy="8" r="0.5" fill="#fff" />
        </g>
        {/* AU right half */}
        <g clipPath={`url(#hr-${s})`}>
          <rect x="16" y="2" width="14" height="28" fill="#00008B" />
          {/* Southern Cross stars */}
          <circle cx="23" cy="8" r="1.5" fill="#fff" />
          <circle cx="28" cy="12" r="1" fill="#fff" />
          <circle cx="25" cy="15" r="0.8" fill="#fff" />
          <circle cx="26" cy="19" r="0.8" fill="#fff" />
          <circle cx="22" cy="22" r="1" fill="#fff" />
        </g>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="0.5" />
      </g>
    ),
  },

  GBPUSD: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <circle cx="16" cy="16" r="14" fill="#000" />
        <defs>
          <clipPath id={`g-hl-${s}`}><rect x="2" y="2" width="14" height="28" /></clipPath>
          <clipPath id={`g-hr-${s}`}><rect x="16" y="2" width="14" height="28" /></clipPath>
        </defs>
        {/* UK left */}
        <g clipPath={`url(#g-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#012169" />
          <line x1="2" y1="2" x2="16" y2="30" stroke="#fff" strokeWidth="3" />
          <line x1="16" y1="2" x2="2" y2="30" stroke="#fff" strokeWidth="3" />
          <line x1="2" y1="2" x2="16" y2="30" stroke="#C8102E" strokeWidth="1.5" />
          <line x1="16" y1="2" x2="2" y2="30" stroke="#C8102E" strokeWidth="1.5" />
          <line x1="9" y1="2" x2="9" y2="30" stroke="#C8102E" strokeWidth="3" />
          <line x1="2" y1="16" x2="16" y2="16" stroke="#C8102E" strokeWidth="3" />
        </g>
        {/* US right */}
        <g clipPath={`url(#g-hr-${s})`}>
          <rect x="16" y="2" width="14" height="28" fill="#002868" />
          <rect x="16" y="6" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="14" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="22" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="2" width="14" height="14" fill="#002868" opacity="0.85" />
          <circle cx="19" cy="6" r="0.5" fill="#fff" />
          <circle cx="22" cy="6" r="0.5" fill="#fff" />
          <circle cx="20.5" cy="9" r="0.5" fill="#fff" />
          <circle cx="23.5" cy="9" r="0.5" fill="#fff" />
        </g>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="0.5" />
      </g>
    ),
  },

  EURUSD: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <circle cx="16" cy="16" r="14" fill="#000" />
        <defs>
          <clipPath id={`e-hl-${s}`}><rect x="2" y="2" width="14" height="28" /></clipPath>
          <clipPath id={`e-hr-${s}`}><rect x="16" y="2" width="14" height="28" /></clipPath>
        </defs>
        {/* EU left */}
        <g clipPath={`url(#e-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#003399" />
          <circle cx="7" cy="6" r="0.8" fill="#FFCC00" />
          <circle cx="11" cy="8" r="0.8" fill="#FFCC00" />
          <circle cx="13" cy="13" r="0.8" fill="#FFCC00" />
          <circle cx="11" cy="18" r="0.8" fill="#FFCC00" />
          <circle cx="7" cy="21" r="0.8" fill="#FFCC00" />
          <circle cx="4" cy="16" r="0.8" fill="#FFCC00" />
          <circle cx="9" cy="12" r="0.8" fill="#FFCC00" />
          <circle cx="5" cy="10" r="0.8" fill="#FFCC00" />
        </g>
        {/* US right */}
        <g clipPath={`url(#e-hr-${s})`}>
          <rect x="16" y="2" width="14" height="28" fill="#002868" />
          <rect x="16" y="6" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="14" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="22" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="2" width="14" height="14" fill="#002868" opacity="0.85" />
          <circle cx="19" cy="6" r="0.5" fill="#fff" />
          <circle cx="22" cy="6" r="0.5" fill="#fff" />
          <circle cx="20.5" cy="9" r="0.5" fill="#fff" />
          <circle cx="23.5" cy="9" r="0.5" fill="#fff" />
        </g>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="0.5" />
      </g>
    ),
  },

  USDJPY: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <circle cx="16" cy="16" r="14" fill="#000" />
        <defs>
          <clipPath id={`j-hl-${s}`}><rect x="2" y="2" width="14" height="28" /></clipPath>
          <clipPath id={`j-hr-${s}`}><rect x="16" y="2" width="14" height="28" /></clipPath>
        </defs>
        {/* US left */}
        <g clipPath={`url(#j-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#002868" />
          <rect x="2" y="6" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="14" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="22" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="2" width="14" height="12" fill="#002868" opacity="0.85" />
          <circle cx="5" cy="5" r="0.5" fill="#fff" />
          <circle cx="8" cy="5" r="0.5" fill="#fff" />
          <circle cx="6.5" cy="8" r="0.5" fill="#fff" />
          <circle cx="9.5" cy="8" r="0.5" fill="#fff" />
        </g>
        {/* Japan right */}
        <g clipPath={`url(#j-hr-${s})`}>
          <rect x="16" y="2" width="14" height="28" fill="#fff" />
          <circle cx="23" cy="16" r="5" fill="#BC002D" />
        </g>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="0.5" />
      </g>
    ),
  },

  USDCAD: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <circle cx="16" cy="16" r="14" fill="#000" />
        <defs>
          <clipPath id={`c-hl-${s}`}><rect x="2" y="2" width="14" height="28" /></clipPath>
          <clipPath id={`c-hr-${s}`}><rect x="16" y="2" width="14" height="28" /></clipPath>
        </defs>
        {/* US left */}
        <g clipPath={`url(#c-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#002868" />
          <rect x="2" y="6" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="14" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="22" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="2" width="14" height="12" fill="#002868" opacity="0.85" />
          <circle cx="5" cy="5" r="0.5" fill="#fff" />
          <circle cx="8" cy="5" r="0.5" fill="#fff" />
          <circle cx="6.5" cy="8" r="0.5" fill="#fff" />
          <circle cx="9.5" cy="8" r="0.5" fill="#fff" />
        </g>
        {/* Canada right */}
        <g clipPath={`url(#c-hr-${s})`}>
          <rect x="16" y="2" width="4" height="28" fill="#FF0000" />
          <rect x="20" y="2" width="6" height="28" fill="#fff" />
          <rect x="26" y="2" width="4" height="28" fill="#FF0000" />
          {/* simplified maple leaf */}
          <polygon
            points="23,8 24,12 27,11 25,14 28,16 25,17 27,20 24,18 23,22 22,18 19,20 21,17 18,16 21,14 19,11 22,12"
            fill="#FF0000"
          />
        </g>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="0.5" />
      </g>
    ),
  },

  USDCHF: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <circle cx="16" cy="16" r="14" fill="#000" />
        <defs>
          <clipPath id={`s-hl-${s}`}><rect x="2" y="2" width="14" height="28" /></clipPath>
          <clipPath id={`s-hr-${s}`}><rect x="16" y="2" width="14" height="28" /></clipPath>
        </defs>
        {/* US left */}
        <g clipPath={`url(#s-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#002868" />
          <rect x="2" y="6" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="14" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="22" width="14" height="4" fill="#BF0A30" />
          <rect x="2" y="2" width="14" height="12" fill="#002868" opacity="0.85" />
          <circle cx="5" cy="5" r="0.5" fill="#fff" />
          <circle cx="8" cy="5" r="0.5" fill="#fff" />
          <circle cx="6.5" cy="8" r="0.5" fill="#fff" />
          <circle cx="9.5" cy="8" r="0.5" fill="#fff" />
        </g>
        {/* Switzerland right */}
        <g clipPath={`url(#s-hr-${s})`}>
          <rect x="16" y="2" width="14" height="28" fill="#FF0000" />
          <rect x="21" y="12" width="4" height="8" fill="#fff" />
          <rect x="19" y="14" width="8" height="4" fill="#fff" />
        </g>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="0.5" />
      </g>
    ),
  },

  AUDUSD: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <circle cx="16" cy="16" r="14" fill="#000" />
        <defs>
          <clipPath id={`au-hl-${s}`}><rect x="2" y="2" width="14" height="28" /></clipPath>
          <clipPath id={`au-hr-${s}`}><rect x="16" y="2" width="14" height="28" /></clipPath>
        </defs>
        {/* AU left */}
        <g clipPath={`url(#au-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#00008B" />
          <circle cx="7" cy="8" r="1.5" fill="#fff" />
          <circle cx="12" cy="12" r="1" fill="#fff" />
          <circle cx="9" cy="15" r="0.8" fill="#fff" />
          <circle cx="10" cy="19" r="0.8" fill="#fff" />
          <circle cx="6" cy="22" r="1" fill="#fff" />
        </g>
        {/* US right */}
        <g clipPath={`url(#au-hr-${s})`}>
          <rect x="16" y="2" width="14" height="28" fill="#002868" />
          <rect x="16" y="6" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="14" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="22" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="2" width="14" height="14" fill="#002868" opacity="0.85" />
          <circle cx="19" cy="6" r="0.5" fill="#fff" />
          <circle cx="22" cy="6" r="0.5" fill="#fff" />
          <circle cx="20.5" cy="9" r="0.5" fill="#fff" />
          <circle cx="23.5" cy="9" r="0.5" fill="#fff" />
        </g>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="0.5" />
      </g>
    ),
  },

  NZDUSD: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <circle cx="16" cy="16" r="14" fill="#000" />
        <defs>
          <clipPath id={`n-hl-${s}`}><rect x="2" y="2" width="14" height="28" /></clipPath>
          <clipPath id={`n-hr-${s}`}><rect x="16" y="2" width="14" height="28" /></clipPath>
        </defs>
        {/* NZ left */}
        <g clipPath={`url(#n-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#012169" />
          <circle cx="5" cy="10" r="1.2" fill="#fff" />
          <circle cx="9" cy="7" r="0.8" fill="#fff" />
          <circle cx="12" cy="11" r="0.7" fill="#fff" />
          <circle cx="8" cy="15" r="0.7" fill="#fff" />
          <circle cx="5" cy="20" r="1" fill="#fff" />
        </g>
        {/* US right */}
        <g clipPath={`url(#n-hr-${s})`}>
          <rect x="16" y="2" width="14" height="28" fill="#002868" />
          <rect x="16" y="6" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="14" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="22" width="14" height="4" fill="#BF0A30" />
          <rect x="16" y="2" width="14" height="14" fill="#002868" opacity="0.85" />
          <circle cx="19" cy="6" r="0.5" fill="#fff" />
          <circle cx="22" cy="6" r="0.5" fill="#fff" />
          <circle cx="20.5" cy="9" r="0.5" fill="#fff" />
          <circle cx="23.5" cy="9" r="0.5" fill="#fff" />
        </g>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="0.5" />
      </g>
    ),
  },

  // ──────────────── Crypto geometric icons ────────────────
  BTCUSD: {
    viewBox: "0 0 32 32",
    element: () => (
      <g>
        <circle cx="16" cy="16" r="15" fill="#F7931A" />
        <circle cx="16" cy="16" r="11" fill="#F7931A" stroke="#FFB347" strokeWidth="1.5" />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#fff"
          fontFamily="monospace"
        >
          B
        </text>
      </g>
    ),
  },

  ETHUSD: {
    viewBox: "0 0 32 32",
    element: () => (
      <g>
        <polygon points="16,2 28,16 16,20 4,16" fill="#627EEA" stroke="#8C7CEB" strokeWidth="1" />
        <polygon points="16,20 28,16 16,30 4,16" fill="#8C7CEB" />
        <polygon points="16,2 28,16 16,20 4,16" fill="none" stroke="#fff" strokeWidth="0.3" opacity="0.3" />
      </g>
    ),
  },

  SOLUSD: {
    viewBox: "0 0 32 32",
    element: (s) => (
      <g>
        <defs>
          <linearGradient id={`sol-grad-${s}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9945FF" />
            <stop offset="100%" stopColor="#14F195" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="15" fill={`url(#sol-grad-${s})`} />
        <circle cx="16" cy="16" r="11" fill={`url(#sol-grad-${s})`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <circle cx="16" cy="16" r="3" fill="#fff" opacity="0.6" />
      </g>
    ),
  },

  DOGEUSD: {
    viewBox: "0 0 32 32",
    element: () => (
      <g>
        <circle cx="16" cy="16" r="15" fill="#C2A633" />
        <circle cx="16" cy="16" r="11" fill="#C2A633" stroke="#E8C547" strokeWidth="1.5" />
        {/* paw/simplified dog face */}
        <ellipse cx="16" cy="14" rx="6" ry="5" fill="#fff" opacity="0.5" />
        <circle cx="13" cy="13" r="1.2" fill="#333" />
        <circle cx="19" cy="13" r="1.2" fill="#333" />
        <path d="M13 17 Q16 20 19 17" stroke="#333" strokeWidth="1" fill="none" />
      </g>
    ),
  },

  LTCUSD: {
    viewBox: "0 0 32 32",
    element: () => (
      <g>
        <polygon
          points="16,2 24,6 24,14 28,14 24,18 24,26 16,30 8,26 8,18 4,14 8,14 8,6"
          fill="#345D9D"
          stroke="#5B8CD6" strokeWidth="1"
        />
        <polygon
          points="16,6 21,8.5 21,15 24,15 21,17.5 21,24 16,26.5 11,24 11,17.5 8,15 11,15 11,8.5"
          fill="#345D9D" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"
        />
        <text x="16" y="20" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#fff" fontFamily="monospace">L</text>
      </g>
    ),
  },

  XRPUSD: {
    viewBox: "0 0 32 32",
    element: () => (
      <g>
        <circle cx="16" cy="16" r="15" fill="#23292F" />
        <circle cx="16" cy="16" r="11" fill="#23292F" stroke="#4A90E2" strokeWidth="1.5" />
        {/* ripple wave */}
        <path d="M6 12 Q11 8 16 12 Q21 16 26 12" stroke="#4A90E2" strokeWidth="1.5" fill="none" />
        <path d="M6 16 Q11 12 16 16 Q21 20 26 16" stroke="#4A90E2" strokeWidth="1.5" fill="none" />
        <path d="M6 20 Q11 16 16 20 Q21 24 26 20" stroke="#4A90E2" strokeWidth="1.5" fill="none" />
      </g>
    ),
  },

  ADAUSD: {
    viewBox: "0 0 32 32",
    element: () => (
      <g>
        <circle cx="16" cy="16" r="15" fill="#0033AD" />
        <circle cx="16" cy="16" r="11" fill="#0033AD" stroke="#4A90E2" strokeWidth="1.5" />
        {/* Cardano dot pattern */}
        <circle cx="10" cy="10" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="16" cy="8" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="22" cy="10" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="13" cy="16" r="1.5" fill="#fff" opacity="0.9" />
        <circle cx="19" cy="16" r="1.5" fill="#fff" opacity="0.9" />
        <circle cx="10" cy="22" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="16" cy="24" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="22" cy="22" r="1.5" fill="#fff" opacity="0.7" />
      </g>
    ),
  },

  DOTUSD: {
    viewBox: "0 0 32 32",
    element: () => (
      <g>
        <rect x="2" y="2" width="28" height="28" rx="6" fill="#E6007A" />
        <rect x="5" y="5" width="22" height="22" rx="4" fill="#E6007A" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* dot pattern */}
        <circle cx="11" cy="11" r="2.5" fill="#fff" opacity="0.8" />
        <circle cx="21" cy="11" r="2.5" fill="#fff" opacity="0.6" />
        <circle cx="16" cy="18" r="2.5" fill="#fff" opacity="0.9" />
        <circle cx="11" cy="24" r="2" fill="#fff" opacity="0.5" />
        <circle cx="21" cy="24" r="2" fill="#fff" opacity="0.5" />
      </g>
    ),
  },
};

const PairIcon: FC<PairIconProps> = ({ symbol, className }) => {
  const uniqueId = useId();
  // strip React's colon-prefix from useId for valid SVG ID usage
  const idSuffix = uniqueId.replace(/:/g, "");

  const def = iconMap[symbol];
  if (!def) {
    return (
      <svg
        viewBox="0 0 32 32"
        className={className}
        width="32"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="14" fill="#555" />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontSize="8"
          fill="#fff"
          fontFamily="monospace"
        >
          {symbol.slice(0, 3)}
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox={def.viewBox}
      className={className}
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      {def.element(idSuffix)}
    </svg>
  );
};

export default PairIcon;