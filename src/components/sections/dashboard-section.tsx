import { twMerge } from "tailwind-merge";

export type DashboardSectionProps = {
  children?: React.ReactNode;
  title: string;
  onTitleClick?: () => void;
};

function DashboardSection ({children, title, onTitleClick}: DashboardSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2
        className={twMerge(
          "text-2xl font-semibold self-start",
          onTitleClick ? "hover:text-primary hover: cursor-pointer" : null,
        )}
      >
        {title}
        {onTitleClick && (
          <span>{" >"}</span>
        )}
      </h2>
      {children}
    </section>
  );
}

export default DashboardSection;
