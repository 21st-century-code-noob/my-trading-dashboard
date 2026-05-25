import { twMerge } from "tailwind-merge";
import { useFlashOnChange } from "@/hooks/useFlashOnChange";
import TextSkeleton from "@/components/skeletons/text-skeleton";
import { usePriceData } from "@/hooks/usePriceData";

export type PriceTextProps = {
  symbol: string;
  decimals?: number;
  /** CSS class for the skeleton bar, merged with default "h-5 w-20". */
  skeletonClassName?: string;
  className?: string;
};

function PriceText({ symbol, decimals = 2, skeletonClassName, className }: PriceTextProps) {
  const { getPriceBySymbol, isLoading } = usePriceData();
  const priceData = getPriceBySymbol(symbol);
  const price = priceData?.currentPrice;
  const { flashClass, flashKey } = useFlashOnChange(price);

  if (isLoading) {
    return <TextSkeleton lines={1} barClassName={twMerge("h-4 w-20", skeletonClassName)} />;
  }

  const fixedPrice = (price === undefined || price === null)
    ? "--"
    : price.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  return (
    <span
      key={flashKey}
      className={twMerge(`font-mono text-base text-foreground ${flashClass}`, className)}
    >
      ${fixedPrice}
    </span>
  );
}

export default PriceText;
