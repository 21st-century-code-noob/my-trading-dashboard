import type { BaseSymbolCellProps } from "./types";
import CapText from "@/components/typography/cap-text";

function CapCell({ symbol }: BaseSymbolCellProps) {
  return <CapText symbol={symbol} />;
}

export default CapCell;