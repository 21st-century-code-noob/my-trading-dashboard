import { useState, useCallback, useMemo } from "react";
import BaseList from "@/components/lists/base-list";
import type { ListHeader, SnapshotSortConfig } from "@/components/lists/base-list";
import SymbolNameCell from "./list-cells/symbol-name-cell";
import PriceChangeCell from "./list-cells/price-change-cell";
import PriceCell from "./list-cells/price-cell";
import { useSymbolData } from "@/hooks/useSymbolData";
import PriceAndChangeCell from "./list-cells/price-and-change-cell";
import { usePriceData } from "@/hooks/usePriceData";

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
    sortable: true,
  },
  {
    key: "price",
    label: "Price",
    render: (row) => <PriceCell symbol={row.symbol} />,
    containerClassName: "w-1/4",
    hiddenOnMobile: true,
    align: "right",
    sortable: true,
  },
  {
    key: "change",
    label: "24h Change",
    render: (row) => <PriceChangeCell symbol={row.symbol} />,
    containerClassName: "w-1/4",
    hiddenOnMobile: true,
    align: "right",
    sortable: true,
  },
  {
    key: "price-and-change",
    label: "Price & Chg",
    render: (row) => <PriceAndChangeCell symbol={row.symbol} />,
    containerClassName: "w-1/2",
    hiddenOnDesktop: true,
    align: "right",
    associatedKeys:["price", "change"],
    sortable: true,
  },
];

export type WatchListProps = {
  /** When true, show a skeleton table while symbols load. */
  loading?: boolean;
};

function WatchList({ loading = false }: WatchListProps) {
  const { watchList } = useSymbolData();
  const { getPriceDataSnapshot } = usePriceData();
  const [sortConfig, setSortConfig] = useState<SnapshotSortConfig>({
    key: "name",
    order: "ascend",
    snapshot: {},
  });

  const onSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      const nextOrder = key === prev.key && prev.order === "ascend" ? "descend" : "ascend";
      const currentSnapshot: Record<string, number> = {};

      if (key === "price" || key === "change") {
        const storeState = getPriceDataSnapshot();

        for (const item of watchList) {
          const market = storeState.getPriceBySymbol(item.symbol);
          currentSnapshot[item.symbol] =
            key === "price"
              ? (market?.currentPrice ?? 0)
              : (market?.priceChange ?? 0);
        }
      }

      return { key, order: nextOrder, snapshot: currentSnapshot };
    });
  }, [getPriceDataSnapshot, watchList]);

  const sortedSnapshot = useMemo(() => {
    const rows: WatchRow[] = watchList.map((item) => ({ ...item, id: item.symbol }));
    return rows.sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.order === "ascend"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      const valA = sortConfig.snapshot[a.symbol] ?? 0;
      const valB = sortConfig.snapshot[b.symbol] ?? 0;

      return sortConfig.order === "ascend" ? valA - valB : valB - valA;
    });
  }, [sortConfig, watchList]);

  return (
    <section>
      <h2 className="text-2xl mb-3 pl-1">Watch List</h2>
      <BaseList
        headers={headers}
        data={sortedSnapshot}
        // deliberately left a stub here to enable the hover effect.
        // hover effect is automatically enabled when onRowClick function presents.
        onRowClick={() => {}}
        sortKey={sortConfig.key}
        sortOrder={sortConfig.order}
        onSort={onSort}
        loading={loading}
      />
    </section>
  );
}

export default WatchList;