import { twMerge } from "tailwind-merge";

export type TableRowCellSkeletonProps = {
  /** CSS class for each shimmer bar. @default "h-4 w-full rounded bg-skeleton animate-skeleton-pulse" */
  barClassName?: string;
};

function TableRowCellSkeleton({
  barClassName,
}: TableRowCellSkeletonProps) {
  return (
    <div
      className={twMerge("h-4 w-full rounded bg-skeleton animate-skeleton-pulse inline-block",
        barClassName,
      )}
    />
  );

}

export default TableRowCellSkeleton;