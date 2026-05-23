import { twMerge } from "tailwind-merge";

export type IconSkeletonProps = {
  /** CSS class for the shimmer bar. @default "h-3.5 w-16 rounded bg-skeleton animate-skeleton-pulse" */
  className?: string;
};

function IconSkeleton({
  className,
}: IconSkeletonProps) {
  return (
    <div
      className={twMerge("w-10 h-10 rounded-full bg-skeleton animate-skeleton-pulse shrink-0",
        className,
      )}
    />
  );
}

export default IconSkeleton;
