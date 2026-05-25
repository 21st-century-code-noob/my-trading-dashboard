import { type FC, type ReactNode, useId } from "react";

export type PairIconProps = {
  symbol: string;
  className?: string;
};

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
        <g clipPath={`url(#hr-${s})`}>
          <rect x="16" y="2" width="14" height="28" fill="#00008B" />
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
        <g clipPath={`url(#g-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#012169" />
          <line x1="2" y1="2" x2="16" y2="30" stroke="#fff" strokeWidth="3" />
          <line x1="16" y1="2" x2="2" y2="30" stroke="#fff" strokeWidth="3" />
          <line x1="2" y1="2" x2="16" y2="30" stroke="#C8102E" strokeWidth="1.5" />
          <line x1="16" y1="2" x2="2" y2="30" stroke="#C8102E" strokeWidth="1.5" />
          <line x1="9" y1="2" x2="9" y2="30" stroke="#C8102E" strokeWidth="3" />
          <line x1="2" y1="16" x2="16" y2="16" stroke="#C8102E" strokeWidth="3" />
        </g>
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
        <g clipPath={`url(#c-hr-${s})`}>
          <rect x="16" y="2" width="4" height="28" fill="#FF0000" />
          <rect x="20" y="2" width="6" height="28" fill="#fff" />
          <rect x="26" y="2" width="4" height="28" fill="#FF0000" />
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
        <g clipPath={`url(#au-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#00008B" />
          <circle cx="7" cy="8" r="1.5" fill="#fff" />
          <circle cx="12" cy="12" r="1" fill="#fff" />
          <circle cx="9" cy="15" r="0.8" fill="#fff" />
          <circle cx="10" cy="19" r="0.8" fill="#fff" />
          <circle cx="6" cy="22" r="1" fill="#fff" />
        </g>
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
        <g clipPath={`url(#n-hl-${s})`}>
          <rect x="2" y="2" width="14" height="28" fill="#012169" />
          <circle cx="5" cy="10" r="1.2" fill="#fff" />
          <circle cx="9" cy="7" r="0.8" fill="#fff" />
          <circle cx="12" cy="11" r="0.7" fill="#fff" />
          <circle cx="8" cy="15" r="0.7" fill="#fff" />
          <circle cx="5" cy="20" r="1" fill="#fff" />
        </g>
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
};

/** Maps a base ticker (e.g. "BTC") to its cryptologos.cc URL. */
const CRYPTO_LOGO_URL: Record<string, string> = {
  BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  SOL: "https://cryptologos.cc/logos/solana-sol-logo.png",
  XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  LTC: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  ADA: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  DOT: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  AVAX: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  LINK: "https://cryptologos.cc/logos/chainlink-link-logo.png",
  UNI: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
  MATIC: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  APT: "https://cryptologos.cc/logos/aptos-apt-logo.png",
  ARB: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
  OP: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
  FIL: "https://cryptologos.cc/logos/filecoin-fil-logo.png",
  ATOM: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
  NEAR: "https://cryptologos.cc/logos/near-protocol-near-logo.png",
  INJ: "https://cryptologos.cc/logos/injective-inj-logo.png",
  SEI: "https://cryptologos.cc/logos/sei-sei-logo.png",
  SUI: "https://cryptologos.cc/logos/sui-sui-logo.png",
  TIA: "https://cryptologos.cc/logos/celestia-tia-logo.png",
};

/** Extract the base ticker from a "TICKERUSD" symbol string. */
function baseTicker(symbol: string): string {
  return symbol.replace(/USD$/i, "").toUpperCase();
}

const FallbackSvg: FC<{ symbol: string; className?: string }> = ({
  symbol,
  className,
}) => (
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

const PairIcon: FC<PairIconProps> = ({ symbol, className }) => {
  const uniqueId = useId();
  const idSuffix = uniqueId.replace(/:/g, "");

  const ticker = baseTicker(symbol);
  const logoUrl = CRYPTO_LOGO_URL[ticker];

  // 1) Prefer cryptologos.cc for known crypto tickers
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={symbol}
        className={className}
        width={32}
        height={32}
        loading="lazy"
        onError={(e) => {
          // Replace broken image with the generic fallback SVG
          const img = e.currentTarget;
          const parent = img.parentNode;
          if (parent) {
            const wrapper = document.createElement("span");
            wrapper.className = className ?? "";
            wrapper.innerHTML =
              `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#555"/><text x="16" y="21" text-anchor="middle" font-size="8" fill="#fff" font-family="monospace">${ticker.slice(0, 3)}</text></svg>`;
            parent.replaceChild(wrapper, img);
          }
        }}
      />
    );
  }

  // 2) Fall back to local SVG icon map (forex pairs)
  const def = iconMap[symbol];
  if (def) {
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
  }

  // 3) Generic fallback
  return <FallbackSvg symbol={symbol} className={className} />;
};

export default PairIcon;