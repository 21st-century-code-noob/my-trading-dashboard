import { useFlashOnChange } from "@/hooks/useFlashOnChange";
import TextSkeleton from "@/components/skeletons/text-skeleton";

type PriceTextProps = {
  price?: number;
  decimals?: number;
  /** When true, show a skeleton placeholder. */
  loading?: boolean;
  /** CSS class for the skeleton bar. @default "h-5 w-20" */
  skeletonClassName?: string;
};

function PriceText({ price, decimals = 2, loading = false, skeletonClassName = "h-5 w-20" }: PriceTextProps) {
  const { flashClass, flashKey } = useFlashOnChange(price);

  if (loading) {
    return <TextSkeleton lines={1} barClassName={skeletonClassName} />;
  }

  const fixedPrice = (price === undefined || price === null) ? "--" : `${price.toFixed(decimals)}`;

  return (
    <span
      key={flashKey}
      className={`font-light font-mono text-foreground ${flashClass}`}
    >
      ${fixedPrice}
    </span>
  );
}

export default PriceText;