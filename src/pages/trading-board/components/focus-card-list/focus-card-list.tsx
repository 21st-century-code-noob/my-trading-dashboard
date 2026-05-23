import FocusCard from "@/components/cards/focus-card";
import { useSymbolData } from "@/hooks/useSymbolData";

export type FocusCardListProps = {
  /** When true, show skeleton cards while symbols load. */
  loading?: boolean;
  skeletonNumber?: number;
};

function FocusCardList({ loading = false, skeletonNumber = 4 }: FocusCardListProps) {
  const { focusList } = useSymbolData();

  return (
    <section>
      <h2 className="text-2xl mb-3 pl-1">Trends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: skeletonNumber }).map((_, i) => <FocusCard key={i} symbol="" loading />)
          : focusList.map((focusItem) => (
            <FocusCard
              symbol={focusItem.symbol}
              key={focusItem.symbol}
            />
          ))}
      </div>
    </section>
  );
}

export default FocusCardList;