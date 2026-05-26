import { useSymbolData } from "@/hooks/useSymbolData";
import FocusCardList from "./components/focus-card-list/focus-card-list";
import WatchList from "./components/watch-list/watch-list";
import CoreMetrics from "./components/core-metrics/core-metrics";
import Ranking from "./components/ranking/ranking";
import Hero from "./components/hero/hero";

function TradingBoard() {
  const { isLoading: symbolsLoading } = useSymbolData();

  return (
    <main className="py-3 space-y-12">
      <Hero />
      <CoreMetrics />
      <FocusCardList loading={symbolsLoading} />
      <Ranking />
      <WatchList loading={symbolsLoading} />
    </main>
  );
}

export default TradingBoard;