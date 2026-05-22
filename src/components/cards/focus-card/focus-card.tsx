import { usePriceData } from "@/hooks/usePriceData";
import BaseCard from "../base-card";
import PriceText from "@/components/typography/price-text";
import PriceChangeText from "@/components/typography/price-change-text";

export type FocusCardProps = {
  symbol: string;
};


function FocusCard({
  symbol,
}: FocusCardProps) {
  const { getPriceBySymbol } = usePriceData();
  const priceData = getPriceBySymbol(symbol);

  return (
    <BaseCard key={symbol} className="flex flex-col gap-1">
      <div className="mb-1">
        <div className="text-foreground font-bold text-lg">{symbol}</div>
        <div className="text-foreground/30 text-sm">{priceData?.name}</div>
      </div>
      <div className="flex justify-between">
        <PriceText price={priceData?.currentPrice} />
        <PriceChangeText priceChange={priceData?.priceChange} />
      </div>
    </BaseCard>
  );
}

export default FocusCard;
