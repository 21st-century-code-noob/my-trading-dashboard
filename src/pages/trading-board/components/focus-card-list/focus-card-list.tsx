import FocusCard from "@/components/cards/focus-card";
import DashboardSection from "@/components/sections/dashboard-section";
import { useSymbolData } from "@/hooks/useSymbolData";

export type FocusCardListProps = {
  /** When true, show skeleton cards while symbols load. */
  loading?: boolean;
  skeletonNumber?: number;
};

function FocusCardList({ loading = false, skeletonNumber = 4 }: FocusCardListProps) {
  const { focusList } = useSymbolData();

  return (
    <DashboardSection
      title="Featured"
      onTitleClick={() => {}}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {loading
          ? Array.from({ length: skeletonNumber }).map((_, i) => <FocusCard key={i} symbol="" loading />)
          : focusList.map((focusItem) => (
            <FocusCard
              symbol={focusItem.symbol}
              key={focusItem.symbol}
            />
          ))}
      </div>
    </DashboardSection>
  );
}

export default FocusCardList;