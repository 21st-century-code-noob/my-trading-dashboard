import { twMerge } from "tailwind-merge";
import { useFlashOnChange } from "@/hooks/useFlashOnChange";
import TextSkeleton from "@/components/skeletons/text-skeleton";
import { usePriceData } from "@/hooks/usePriceData";

/** Suffix array: index = tier (log10(value) / 3) */
const SUFFIXES = ["", "K", "M", "B", "T"];

function abbreviate(value: number): string {
  if (value === 0) return "$0";
  const tier = Math.min(Math.floor(Math.log10(Math.abs(value)) / 3), SUFFIXES.length - 1);
  if (tier === 0) return "$" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const suffix = SUFFIXES[tier];
  const scaled = value / Math.pow(10, tier * 3);
  return "$" + scaled.toFixed(1) + suffix;
}

export type CapTextProps = {
  symbol: string;
  skeletonClassName?: string;
  className?: string;
};

function CapText({ symbol, skeletonClassName, className }: CapTextProps) {
  const { getPriceBySymbol, isLoading } = usePriceData();
  const priceData = getPriceBySymbol(symbol);
  const marketCap = priceData?.marketCap;
  const { flashClass, flashKey } = useFlashOnChange(marketCap);

  if (isLoading) {
    return <TextSkeleton lines={1} barClassName={twMerge("h-4 w-20", skeletonClassName)} />;
  }

  return (
    <span
      key={flashKey}
      className={twMerge(`font-mono text-base text-foreground ${flashClass}`, className)}
    >
      {marketCap !== undefined ? abbreviate(marketCap) : "--"}
    </span>
  );
}

export default CapText;