import { usePriceData } from "@/hooks/usePriceData";
import type { BaseSymbolCellProps } from "./types";
import PriceText from "@/components/typography/price-text";

function PriceCell ({ symbol }: BaseSymbolCellProps) {
  const { getPriceBySymbol } = usePriceData();
  const priceData = getPriceBySymbol(symbol);

  return (
    <PriceText price={priceData?.currentPrice} />
  );
}

export default PriceCell;
