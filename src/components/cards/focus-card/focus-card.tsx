import { usePriceData } from "@/hooks/usePriceData";
import BaseCard from "../base-card";
import PriceText from "@/components/typography/price-text";
import PriceChangeText from "@/components/typography/price-change-text";
import PairIcon from "@/components/pair-icon/pair-icon";

export type FocusCardProps = {
  symbol: string;
};

function FocusCard({ symbol }: FocusCardProps) {
  const { getPriceBySymbol } = usePriceData();
  const priceData = getPriceBySymbol(symbol);

  return (
    <BaseCard key={symbol} className="flex flex-col gap-1" onClick={() => {}}>
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="min-w-0">
          <div className="text-foreground font-bold text-lg truncate">{symbol}</div>
          <div className="text-foreground/30 text-sm truncate">{priceData?.name}</div>
        </div>
        <PairIcon symbol={symbol} className="w-10 h-10 shrink-0" />
      </div>
      <div className="flex justify-between">
        <PriceText price={priceData?.currentPrice} />
        <PriceChangeText priceChange={priceData?.priceChange} />
      </div>
    </BaseCard>
  );
}

export default FocusCard;
