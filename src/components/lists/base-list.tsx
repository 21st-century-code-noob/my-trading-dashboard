import React from "react";
import BaseCard from "@/components/cards/base-card";
import { twMerge } from "tailwind-merge";
import TableHeaderCellSkeleton from "@/components/skeletons/table-header-cell-skeleton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TableRowCellSkeleton from "../skeletons/table-row-cell-skeleton";

export type SortConfig<TSortKey> = {
  key: TSortKey;
  order: "ascend" | "descend";
};

export type SnapshotSortConfig<TSortKey> = SortConfig<TSortKey> & {
  snapshot: Record<string, number>;
};

export type Identifiable = {
  id: string | number;
};

export type ListHeader<T extends Identifiable> = {
  key: (keyof T) | (string & {});
  label: string;
  containerClassName?: string;
  render?: (row: T) => React.ReactNode;
  hiddenOnMobile?: boolean;
  hiddenOnDesktop?: boolean;
  associatedKeys?: ((keyof T) | (string & {}))[];
  align?: "left" | "right";
};

export type BaseListProps<T extends Identifiable> = {
  headers: ListHeader<T>[];
  data: T[];
  rowClassName?: string;
  onRowClick?: (row: T) => void;
  sortKey?: (keyof T) | (string & {});
  sortOrder?: "ascend" | "descend";
  onSort?: (key: (keyof T) | (string & {})) => void;
  /** When true, render a skeleton placeholder with `rowsSkeletonCount` rows. */
  loading?: boolean;
  /** Number of skeleton rows to show when loading. @default 8 */
  rowsSkeletonCount?: number;
};

function BaseList<T extends Identifiable>({
  headers,
  data,
  onRowClick,
  sortKey,
  sortOrder,
  onSort,
  rowClassName,
  loading = false,
  rowsSkeletonCount = 8,
}: BaseListProps<T>) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const visibleHeaders = headers.filter(
    (h) => !((h.hiddenOnMobile && isMobile) || (h.hiddenOnDesktop && !isMobile)),
  );

  const getNextSortKey = (header: ListHeader<T>) => {
    const keys = (header.associatedKeys?.length ? header.associatedKeys : [header.key]).map(String);
    if (!sortKey) return keys[0];

    const currentIdx = keys.indexOf(String(sortKey));
    if (currentIdx === -1) return keys[0];

    // same key + asc → toggle to desc; desc → advance to next key (wrap) with asc
    if (sortOrder === "ascend") return String(sortKey);
    return keys[(currentIdx + 1) % keys.length];
  };

  const isHeaderActive = (header: ListHeader<T>) => {
    if (String(sortKey) === String(header.key)) return true;
    return header.associatedKeys?.some((k) => String(k) === sortKey) ?? false;
  };

  return (
    <BaseCard className="p-0 overflow-hidden">
      <table className="w-full p-3">
        <thead>
          <tr>
            {visibleHeaders.map((h) => (
              <th
                key={String(h.key)}
                className={twMerge(
                  "font-extralight uppercase py-3 text-sm text-left text-table-header px-3 last:text-right",
                  h.align === "right" ? "text-right" : null,
                  !loading && onSort ? "hover:bg-card-hover cursor-pointer" : undefined,
                  h.containerClassName,
                )}
                onClick={() => {
                  if (!loading && onSort) onSort(getNextSortKey(h));
                }}
              >
                {loading ? (
                  <TableHeaderCellSkeleton />
                ) : (
                  <>
                    {h.label}
                    {onSort && isHeaderActive(h) && (
                      <span className="ml-1 text-primary">
                        {sortOrder === "ascend" ? "▲" : "▼"}
                      </span>
                    )}
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: rowsSkeletonCount }).map((_, i) => (
              <tr key={i}>
                {visibleHeaders.map((h) => (
                  <td
                    key={String(h.key)}
                    className={twMerge(
                      "py-6 pl-3 h-auto last:pr-3 last:text-right",
                      h.align === "right" ? "text-right" : null,
                      h.containerClassName,
                    )}
                  >
                    <TableRowCellSkeleton />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  if (!loading && onRowClick) onRowClick(row);
                }}
                className={twMerge(
                  onRowClick ? "hover:bg-card-hover cursor-pointer" : undefined,
                  rowClassName,
                )}
              >
                {visibleHeaders.map((h) => (
                  <td
                    key={String(h.key)}
                    className={
                      twMerge("text-lg py-6 px-3 h-auto last:text-right",
                        h.align === "right" ? "text-right" : null,
                        h.containerClassName,
                      )}
                  >
                    {h.render
                      ? h.render(row)
                      : String((row as Record<PropertyKey, unknown>)[h.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </BaseCard>
  );
}

export default BaseList;