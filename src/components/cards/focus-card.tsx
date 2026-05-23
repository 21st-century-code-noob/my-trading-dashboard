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
      className="flex flex-col gap-1 min-h-27"
      // Stub function left here on purpose to enable the hover effect. In my design, hover effect is enable when onClick binding is detected.
      onClick={loading ? undefined : () => {}}
    >
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="min-w-0">
          {loading ? (
            <>
              <TextSkeleton lines={2} barClassName="h-5 w-16" />
            </>
          ) : (
            <>
              <div className="text-foreground font-bold text-lg truncate">{symbol}</div>
              <div className="text-foreground/30 text-sm truncate">{priceData?.name}</div>
            </>
          )}
        </div>
        {loading ? (
          <IconSkeleton />
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