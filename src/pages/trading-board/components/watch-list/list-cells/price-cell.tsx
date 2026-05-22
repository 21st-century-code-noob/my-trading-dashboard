import { usePriceData } from "@/hooks/usePriceData";
import type { BaseSymbolCellProps } from "./types";
import PriceText from "@/components/typography/price-text";

function PriceCell ({ symbol }: BaseSymbolCellProps) {
  const { getPriceBySymbol, isLoading: priceLoading } = usePriceData();
  const priceData = getPriceBySymbol(symbol);

  return (
    <PriceText price={priceData?.currentPrice} loading={priceLoading} />
  );
}

export default PriceCell;