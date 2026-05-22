import type { BaseSymbolCellProps } from "./types";

type SymbolNameCellProps = BaseSymbolCellProps & {
  name: string;
};

function SymbolNameCell ({ symbol, name }: SymbolNameCellProps) {
  return (
    <div className="flex flex-row items-center gap-3">
      <span className="text-lg text-foreground">{symbol}</span>
      <span className="text-sm text-foreground/30">{name}</span>
    </div>
  );
}

export default SymbolNameCell;
