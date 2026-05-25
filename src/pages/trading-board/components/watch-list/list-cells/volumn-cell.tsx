import type { BaseSymbolCellProps } from "./types";
import VolumnText from "@/components/typography/volumn-text";

function VolumnCell({ symbol }: BaseSymbolCellProps) {
  return <VolumnText symbol={symbol} />;
}

export default VolumnCell;