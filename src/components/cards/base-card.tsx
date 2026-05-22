import { twMerge } from "tailwind-merge";

type BaseCardProps = {
  children?: React.ReactNode;
  className?: string;
};

function BaseCard({
  children,
  className,
}: BaseCardProps) {
  return (
    <div className={twMerge("bg-card border border-border rounded-xl p-3", className)}>
      {children}
    </div>
  );
}

export default BaseCard;
