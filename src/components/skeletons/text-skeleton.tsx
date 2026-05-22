import { twMerge } from "tailwind-merge";

export type TextSkeletonProps = {
  /** Number of lines to render (stacked vertically). Default: 1 */
  lines?: number;
  /** Additional classes applied to each line container */
  className?: string;
  /** Classes applied to each shimmer bar. Use to control height/width — defaults to h-4 w-full rounded */
  barClassName?: string;
};

function TextSkeleton({
  lines = 1,
  className,
  barClassName,
}: TextSkeletonProps) {
  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={twMerge(
            "h-4 w-full rounded bg-skeleton skeleton-pulse",
            barClassName,
          )}
        />
      ))}
    </div>
  );
}

export default TextSkeleton;