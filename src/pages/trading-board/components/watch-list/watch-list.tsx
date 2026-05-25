import { useState, useCallback, useMemo } from "react";
import BaseList from "@/components/lists/base-list";
import type { ListHeader, SnapshotSortConfig } from "@/components/lists/base-list";
import SymbolNameCell from "./list-cells/symbol-name-cell";
import PriceChangeCell from "./list-cells/price-change-cell";
import PriceCell from "./list-cells/price-cell";
import VolumnCell from "./list-cells/volumn-cell";
import CapCell from "./list-cells/cap-cell";
import { useSymbolData } from "@/hooks/useSymbolData";
import PriceAndChangeCell from "./list-cells/price-and-change-cell";
import VolumnCapCell from "./list-cells/volumn-cap-cell";
import { usePriceData } from "@/hooks/usePriceData";
import DashboardSection from "@/components/sections/dashboard-section";

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
    containerClassName: "w-1/5",
    sortable: true,
  },
  {
    key: "price",
    label: "Price",
    render: (row) => <PriceCell symbol={row.symbol} />,
    containerClassName: "w-1/5",
    hiddenOnMobile: true,
    align: "right",
    sortable: true,
  },
  {
    key: "change",
    label: "24h Change",
    render: (row) => <PriceChangeCell symbol={row.symbol} />,
    containerClassName: "w-1/5",
    hiddenOnMobile: true,
    align: "right",
    sortable: true,
  },
  {
    key: "volume",
    label: "24h Volume",
    render: (row) => <VolumnCell symbol={row.symbol} />,
    containerClassName: "w-1/5",
    hiddenOnMobile: true,
    align: "right",
    sortable: true,
  },
  {
    key: "marketCap",
    label: "Market Cap",
    render: (row) => <CapCell symbol={row.symbol} />,
    containerClassName: "w-1/5",
    hiddenOnMobile: true,
    align: "right",
    sortable: true,
  },
  {
    key: "price-and-change",
    label: "Price/Chg",
    render: (row) => <PriceAndChangeCell symbol={row.symbol} />,
    containerClassName: "w-1/3",
    hiddenOnDesktop: true,
    align: "right",
    associatedKeys:["price", "change"],
    sortable: true,
  },
  {
    key: "volume-cap",
    label: "Vol/Cap",
    render: (row) => <VolumnCapCell symbol={row.symbol} />,
    containerClassName: "w-1/3",
    hiddenOnDesktop: true,
    align: "right",
    associatedKeys:["marketCap", "volume"],
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

      if (key === "price" || key === "change" || key === "volume" || key === "marketCap" || key === "volume-cap") {
        const storeState = getPriceDataSnapshot();

        for (const item of watchList) {
          const market = storeState.getPriceBySymbol(item.symbol);
          currentSnapshot[item.symbol] =
            key === "price"
              ? (market?.currentPrice ?? 0)
              : key === "change"
                ? (market?.priceChange ?? 0)
                : key === "volume"
                  ? (market?.volume24h ?? 0)
                  : key === "marketCap"
                    ? (market?.marketCap ?? 0)
                    : (market?.volume24h ?? 0);
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
    <DashboardSection
      title="Watch List"
      onTitleClick={() => {}}
    >
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
    </DashboardSection>
  );
}

export default WatchList;