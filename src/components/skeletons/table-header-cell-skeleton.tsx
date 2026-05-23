import { twMerge } from "tailwind-merge";

export type TableHeaderCellSkeletonProps = {
  /** CSS class for the shimmer bar. @default "h-3.5 w-16 rounded bg-skeleton skeleton-pulse" */
  barClassName?: string;
};

function TableHeaderCellSkeleton({
  barClassName,
}: TableHeaderCellSkeletonProps) {
  return (
    <div
      className={twMerge("h-3.5 w-16 rounded bg-skeleton skeleton-pulse inline-block",
        barClassName,
      )}
    />
  );
}

export default TableHeaderCellSkeleton;