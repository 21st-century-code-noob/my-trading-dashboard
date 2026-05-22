import { usePriceData } from "@/hooks/usePriceData";
import BaseCard from "./base-card";
import PriceText from "@/components/typography/price-text";
import PriceChangeText from "@/components/typography/price-change-text";
import TextSkeleton from "@/components/skeletons/text-skeleton";
import PairIcon from "@/components/pair-icon/pair-icon";

export type FocusCardProps = {
  symbol: string;
  loading?: boolean;
};

function FocusCard({ symbol, loading = false }: FocusCardProps) {
  const { getPriceBySymbol } = usePriceData();
  const priceData = getPriceBySymbol(symbol);

  return (
    <BaseCard
      className="flex flex-col gap-1 min-h-27" // fixed height to make sure card doesn't flicker after loading.
      onClick={loading ? undefined : () => {}}
    >
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="min-w-0">
          {loading ? (
            <>
              <TextSkeleton lines={1} barClassName="h-7 w-16" />
              <TextSkeleton lines={1} className="mt-1" barClassName="h-4 w-24" />
            </>
          ) : (
            <>
              <div className="text-foreground font-bold text-lg truncate">{symbol}</div>
              <div className="text-foreground/30 text-sm truncate">{priceData?.name}</div>
            </>
          )}
        </div>
        {loading ? (
          <div className="w-10 h-10 rounded-full bg-skeleton skeleton-pulse shrink-0" />
        ) : (
          <PairIcon symbol={symbol} className="w-10 h-10 shrink-0" />
        )}
      </div>

      <div className="flex justify-between">
        <PriceText symbol={symbol} />
        <PriceChangeText symbol={symbol} />
      </div>
    </BaseCard>
  );
}

export default FocusCard;