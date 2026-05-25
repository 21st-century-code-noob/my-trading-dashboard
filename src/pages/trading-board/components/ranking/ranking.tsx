import { useSymbolData } from "@/hooks/useSymbolData";
import DashboardSection from "@/components/sections/dashboard-section";
import RankingCard from "./ranking-card";

function Ranking() {
  const { topList } = useSymbolData();

  return (
    <DashboardSection title="Ranking" onTitleClick={() => {}}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <RankingCard title="Market Cap" data={topList.marketCap} />
        <RankingCard title="Top Gainers" data={topList.gainer} />
      </div>
    </DashboardSection>
  );
}

export default Ranking;