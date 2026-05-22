import React from "react";
import BaseCard from "@/components/cards/base-card";
import { twMerge } from "tailwind-merge";

export interface Identifiable {
  id: string | number;
}

export type ListHeader<T extends Identifiable> = {
  key: (keyof T) | (string & {});
  label: string;
  // use tailwind style
  containerClassName?: string;
  render?: (row: T) => React.ReactNode;
};

type TickerListProps<T extends Identifiable> = {
  headers: ListHeader<T>[];
  data: T[];
  rowClassName?: string;
  onRowClick?: (row: T) => void;
  sortKey?: (keyof T) | (string & {});
  sortOrder?: "ascend" | "descend";
  onSort?: (key: (keyof T) | (string & {})) => void;
};

function BaseList<T extends Identifiable>({
  headers,
  data,
  onRowClick,
  sortKey,
  sortOrder,
  onSort,
  rowClassName,
}: TickerListProps<T>) {
  return (
    <BaseCard className="p-0 overflow-hidden">
      <table className="w-full p-3">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={String(h.key)}
                className={
                  twMerge("font-extralight uppercase text-left pt-3 pb-3 text-sm text-table-header pl-3 last:pr-3",
                    onSort ? "hover:bg-card-hover cursor-pointer" : undefined,
                    h.containerClassName)
                }
                onClick={() => {
                  if (onSort) onSort(h.key);
                }}
              >
                {h.label}
                {onSort && sortKey === h.key && (
                  <span className="ml-1 text-primary">
                    {sortOrder === "ascend" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              onClick={() => {
                if (onRowClick) onRowClick(row);
              }}
              className={twMerge(
                onRowClick ? "hover:bg-card-hover cursor-pointer" : undefined,
                rowClassName,
              )}
            >
              {headers.map((h) => (
                <td
                  key={String(h.key)}
                  className={
                    twMerge("text-left text-lg py-6 pl-3 h-auto last:pl-3",
                      h.containerClassName)
                  }
                >
                  {h.render
                    ? h.render(row)
                    : String((row as Record<PropertyKey, unknown>)[h.key ] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </BaseCard>
  );
}

export default BaseList;