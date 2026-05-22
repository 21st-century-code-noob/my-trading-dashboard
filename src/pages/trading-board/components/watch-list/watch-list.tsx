import { usePriceData } from "@/hooks/usePriceData";
import BaseList from "@/components/lists/base-list";
import type { ListHeader } from "@/components/lists/base-list";
import SymbolNameCell from "./list-cells/symbol-name-cell";
import PriceChangeCell from "./list-cells/price-change-cell";
import PriceCell from "./list-cells/price-cell";

type WatchRow = {
  symbol: string;
  name: string;
  id: string;
};

const headers: ListHeader<WatchRow>[] = [
  {
    key: "name",
    label: "Name",
    render: (row) => <SymbolNameCell symbol={row.symbol} name={row.name} />,
    containerClassName: "w-1/2",
  },
  { 
    key: "price",
    label: "Price",
    render: (row) => <PriceCell symbol={row.symbol} />,
    containerClassName: "w-1/4",
  },
  {
    key: "change",
    label: "24h Change",
    render: (row) => <PriceChangeCell symbol={row.symbol} />,
    containerClassName: "w-1/4",
  },
];

function WatchList() {
  const { watchList } = usePriceData();

  const processedList = watchList.map((item) => ({
    ...item,
    id: item.symbol,
  }))

  return (
    <section>
      <h2 className="text-2xl mb-3 pl-1">Watch List</h2>
      <BaseList headers={headers} data={processedList} />
    </section>
  );
}

export default WatchList;