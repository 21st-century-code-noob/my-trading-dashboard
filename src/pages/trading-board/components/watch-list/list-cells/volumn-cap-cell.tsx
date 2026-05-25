import type { BaseSymbolCellProps } from "./types";
import CapText from "@/components/typography/cap-text";
import VolumnText from "@/components/typography/volumn-text";

function VolumnCapCell({ symbol }: BaseSymbolCellProps) {
  return (
    <div className="inline-flex flex-col items-end  gap-1">
      <VolumnText symbol={symbol} className="text-base" />
      <CapText symbol={symbol} className="text-neutral-400 text-sm" />
    </div>
  );
}

export default VolumnCapCell;