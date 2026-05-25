import { usePriceData } from "@/hooks/usePriceData";
import PairIcon from "@/components/pair-icon/pair-icon";
import PriceText from "@/components/typography/price-text";
import PriceChangeText from "@/components/typography/price-change-text";
import BaseCard from "@/components/cards/base-card";
import type { SymbolPair } from "@/store/symbolStore";

export type RankingCardProps = {
  title: string;
  data: SymbolPair[];
};

function RankItem({ symbol, name, rank }: { symbol: string; name: string; rank: number }) {
  const { getPriceBySymbol } = usePriceData();
  const priceData = getPriceBySymbol(symbol);

  return (
    <div className="flex items-center gap-3 py-2 px-3 hover:bg-card-hover hover:cursor-pointer rounded-lg transition-colors">
      {/* Rank badge */}
      <div className="w-6 text-center text-sm font-semibold text-table-header shrink-0">
        {rank}
      </div>

      {/* Icon */}
      <PairIcon symbol={symbol} className="w-8 h-8 shrink-0" />

      {/* Name + Symbol */}
      <div className="min-w-0 flex-1">
        <div className="text-base font-medium text-foreground truncate">{priceData?.name ?? name}</div>
        <div className="text-xs font-thin text-foreground/60 truncate">{symbol}</div>
      </div>

      {/* Price + Change */}
      <div className="flex flex-col items-end gap-0.5 shrink-0">
        <PriceText symbol={symbol} className="text-base font-semibold" />
        <PriceChangeText symbol={symbol} className="text-xs" />
      </div>
    </div>
  );
}

function RankingCard({ title, data }: RankingCardProps) {
  if (data.length === 0) return null;

  return (
    <BaseCard className="w-full">
      <div className="text-table-header uppercase text-sm font-light mb-3">
        {title}
      </div>
      <div className="rounded-xl overflow-hidden">
        {data.map((item, i) => (
          <RankItem
            key={item.symbol}
            symbol={item.symbol}
            name={item.name}
            rank={i + 1}
          />
        ))}
      </div>
    </BaseCard>
  );
}

export default RankingCard;