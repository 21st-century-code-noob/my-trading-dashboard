import FocusCard from "@/components/cards/focus-card/focus-card";
import data from "@/data/dummy-symbols.json"


function FocusCardList() {
  return (
    <section>
      <h2 className="text-2xl mb-3 pl-1">Trends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.focusList.map((focusItem) => (
          <FocusCard
            symbol={focusItem.symbol}
            key={focusItem.symbol}
          />
        ))}
      </div>
    </section>
  )
}

export default FocusCardList;
