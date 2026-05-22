import TextSkeleton from "@/components/skeletons/text-skeleton";

type PriceChangeTextProps = {
  priceChange?: number;
  decimals?: number;
  /** When true, show a skeleton placeholder. */
  loading?: boolean;
  /** CSS class for the skeleton bar. @default "h-5 w-16" */
  skeletonClassName?: string;
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

function PriceChangeText({ priceChange, decimals = 2, loading = false, skeletonClassName = "h-5 w-16"}: PriceChangeTextProps) {
  if (loading) {
    return <TextSkeleton lines={1} barClassName={skeletonClassName} />;
  }

  return (
    <span className={`font-mono font-light ${getChangeTextClass(priceChange)}`}>
      {getChangePercentString(priceChange, decimals)}
    </span>

  );
}

export default PriceChangeText;