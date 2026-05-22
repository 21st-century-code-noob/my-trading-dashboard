import FocusCardList from "./components/focus-card-list/focus-card-list";
import WatchList from "./components/watch-list/watch-list";

function TradingBoard() {
  return (
    <main className="p-6 space-y-6">
      <FocusCardList />
      <WatchList />
    </main>
  );
}

export default TradingBoard;
