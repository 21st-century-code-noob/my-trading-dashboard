import Header from "@/components/headers/header";
import TradingBoard from "@/pages/trading-board/trading-board";
import BreadScrumb from "./components/sections/bread-scumb";
import { twMerge } from "tailwind-merge";
import { DEFAULT_SPACING } from "./consts/styleConsts";

function App() {
  return (
    <div className="min-h-screen min-w-xs bg-background text-foreground flex flex-col">
      <Header />
      <div className={twMerge("my-6 space-y-3 max-w-8xl mx-auto w-full", DEFAULT_SPACING)}>
        <BreadScrumb />
        <TradingBoard />
      </div>
    </div>
  );
}

export default App;
