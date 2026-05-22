import { twMerge } from "tailwind-merge";

export type TableRowSkeletonProps = {
  /** Number of skeleton rows to render. @default 1 */
  count?: number;
  /** CSS class for each shimmer bar. @default "h-4 w-full rounded bg-skeleton skeleton-pulse" */
  barClassName?: string;
  /** CSS class for each <td>. @default "py-6 px-4" */
  cellClassName?: string;
};

function TableRowSkeleton({
  count = 1,
  barClassName,
  cellClassName,
}: TableRowSkeletonProps) {
  return Array.from({ length: count }).map((_, i) => (
    <tr key={i}>
      <td
        colSpan={999}
        className={twMerge("py-6 px-4",
          cellClassName,
        )}
      >
        <div
          className={twMerge("h-4 w-full rounded bg-skeleton skeleton-pulse",
            barClassName,
          )}
        />
      </td>
    </tr>
  ));
}

export default TableRowSkeleton;