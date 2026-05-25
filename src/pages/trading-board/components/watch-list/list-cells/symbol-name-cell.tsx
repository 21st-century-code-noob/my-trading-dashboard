import type { BaseSymbolCellProps } from "./types";
import PairIcon from "@/components/pair-icon/pair-icon";

type SymbolNameCellProps = BaseSymbolCellProps & {
  name: string;
};

function SymbolNameCell({ symbol, name }: SymbolNameCellProps) {
  return (
    <div className="flex flex-row items-center h-auto gap-3">
      <PairIcon symbol={symbol} className="w-8 h-8 shrink-0" />
      <div className="flex flex-col min-w-0 items-start sm:flex-row sm:items-center">
        <span className="text-base font-semibold text-foreground truncate">{name}</span>
        <span className="text-xs font-light text-foreground/50 truncate sm:ml-3">{symbol}</span>
      </div>
    </div>
  );
}

export default SymbolNameCell;
