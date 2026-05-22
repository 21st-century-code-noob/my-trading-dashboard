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
  render?: (value: T) => React.ReactNode;
};

type TickerListProps<T extends Identifiable> = {
  headers: ListHeader<T>[];
  data: T[];
};

function BaseList<T extends Identifiable>({
  headers,
  data,
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
                  twMerge("font-extralight uppercase text-left pt-3 pb-3 text-sm text-table-header first:pl-3 last:pl-3",
                    h.containerClassName)
                }
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {headers.map((h) => (
                <td
                  key={String(h.key)}
                  className={
                    twMerge("text-left text-lg pt-3 pb-2 first:pl-3 last:pl-3",
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