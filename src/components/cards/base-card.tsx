import { twMerge } from "tailwind-merge";

export type BaseCardProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function BaseCard({
  children,
  className,
  onClick,
}: BaseCardProps) {
  return (
    <div
      className={twMerge("bg-card border border-border rounded-xl p-3",
        onClick ? "hover:bg-card-hover cursor-pointer" : undefined,
        className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default BaseCard;
