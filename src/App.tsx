import Header from "@/components/headers/header";
import TradingBoard from "@/pages/trading-board/trading-board";

function App() {
  return (
    <div className="min-h-screen min-w-xs bg-background text-foreground flex flex-col">
      <Header />
      <TradingBoard />
    </div>
  );
}

export default App;
