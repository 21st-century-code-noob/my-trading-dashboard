import { twMerge } from "tailwind-merge";
import TextSkeleton from "@/components/skeletons/text-skeleton";
import { usePriceData } from "@/hooks/usePriceData";

type PriceChangeTextProps = {
  symbol: string;
  decimals?: number;
  /** CSS class for the skeleton bar, merged with default "h-5 w-16". */
  skeletonClassName?: string;
  className?: string;
};

function getChangeTextClass (priceChange: number | undefined) {
  if (!priceChange || priceChange < 0) {
    return "text-down";
  } else {
    return "text-up";
  }
}

const getChangePercentString = (changePercent?: number, decimals?: number) => {
  if (changePercent === undefined || changePercent === null) return "--";
  if (changePercent === 0) return "0.00%";
  const changePercentFixed = changePercent.toFixed(decimals);
  if (changePercent > 0) return `+${changePercentFixed}%`;
  return `${changePercentFixed}%`;
};

function PriceChangeText({ symbol, decimals = 2, skeletonClassName, className }: PriceChangeTextProps) {
  const { getPriceBySymbol, isLoading } = usePriceData();
  const priceData = getPriceBySymbol(symbol);
  const priceChange = priceData?.priceChange;

  if (isLoading) {
    return <TextSkeleton lines={1} barClassName={twMerge("h-5 w-16", skeletonClassName)} />;
  }

  return (
    <span className={twMerge(`font-mono text-base font-light ${getChangeTextClass(priceChange)}`, className)}>
      {getChangePercentString(priceChange, decimals)}
    </span>

  );
}

export default PriceChangeText;
