import { useSymbolStore } from "@/store/symbolStore";

export function useSymbolData() {
  const focusList = useSymbolStore((s) => s.focusList);
  const watchList = useSymbolStore((s) => s.watchList);
  const allSymbols = useSymbolStore((s) => s.allSymbols);
  const isLoading = useSymbolStore((s) => s.isLoading);

  return {
    focusList,
    watchList,
    allSymbols,
    isLoading,
  };
}