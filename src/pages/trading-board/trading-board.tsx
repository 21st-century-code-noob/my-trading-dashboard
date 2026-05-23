import { useSymbolData } from "@/hooks/useSymbolData";
import FocusCardList from "./components/focus-card-list/focus-card-list";
import WatchList from "./components/watch-list/watch-list";

function TradingBoard() {
  const { isLoading: symbolsLoading } = useSymbolData();

  return (
    <main className="p-3 space-y-12 max-w-5xl mx-auto w-full sm:p-6">
      <FocusCardList loading={symbolsLoading} />
      <WatchList loading={symbolsLoading} />
    </main>
  );
}

export default TradingBoard;