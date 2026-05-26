import { usePriceData } from "@/hooks/usePriceData";
import BaseCard from "./base-card";
import PriceText from "@/components/typography/price-text";
import PriceChangeText from "@/components/typography/price-change-text";
import TextSkeleton from "@/components/skeletons/text-skeleton";
import PairIcon from "@/components/pair-icon/pair-icon";
import IconSkeleton from "../skeletons/icon-skeleton";

export type FocusCardProps = {
  symbol: string;
  loading?: boolean;
};

function FocusCard({ symbol, loading = false }: FocusCardProps) {
  const { getPriceBySymbol } = usePriceData();
  const priceData = getPriceBySymbol(symbol);

  return (
    <BaseCard
    // fixed height to make sure card doesn't flicker after loading.
      className="flex flex-row gap-1 min-h-19 justify-between"
      // Stub function left here on purpose to enable the hover effect. In my design, hover effect is enable when onClick binding is detected.
      onClick={loading ? undefined : () => {}}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex flex-row items-center gap-3">
          {loading ? (
            <IconSkeleton />
          ) : (
            <PairIcon symbol={symbol} className="w-10 h-10 shrink-0" />
          )}
          {loading ? (
            <>
              <TextSkeleton lines={2} barClassName="h-4 w-16" />
            </>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="text-foreground font-semibold text-base truncate">{priceData?.name}</div>
              <div
                className="text-foreground/60 font-light text-xs truncate"
              >
                {symbol}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-end text-right gap-1">
        <PriceText symbol={symbol} skeletonClassName="mb-2" />
        <PriceChangeText symbol={symbol} className="text-sm" />
      </div>
    </BaseCard>
  );
}

export default FocusCard;