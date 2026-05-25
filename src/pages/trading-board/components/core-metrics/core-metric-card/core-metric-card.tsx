import BaseCard from "@/components/cards/base-card";
import { useMarketMetrics } from "@/hooks/useMarketMetrics";
import type { MetricKey } from "@/store/marketStore";
import { twMerge } from "tailwind-merge";

export type MetricOption = "percentage" | "abbreviation";

export type CoreMetricsCardProps = {
  title: string;
  metricKey: MetricKey;
  option?: MetricOption;
  subMetricKey?: MetricKey;
  subOption?: MetricOption;
  showSign?: boolean;
  onSelect?: () => void;
  selected?: boolean;
};

const SUFFIXES = ["", "K", "M", "B", "T"];

function abbreviate(value: number): string {
  if (value === 0) return "0";
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);
  if (tier === 0) return value.toFixed(0);
  const suffix = SUFFIXES[tier] ?? "";
  const scaled = value / Math.pow(10, tier * 3);
  return scaled.toFixed(2) + suffix;
}

function formatValue(value: number, option?: MetricOption, showSign = false): string {
  switch (option) {
    case "percentage": {
      const prefix = showSign && value > 0 ? "+" : "";
      return prefix + value + "%";
    }
    case "abbreviation":
      return abbreviate(value);
    default:
      return String(value);
  }
}

function valueColorClass(value: number): string {
  if (value > 0) return "text-up";
  if (value < 0) return "text-down";
  return "";
}

function CoreMetricCard({
  title,
  metricKey,
  option,
  subMetricKey,
  subOption,
  showSign = false,
  onSelect,
  selected,
}: CoreMetricsCardProps) {
  const { getMetric } = useMarketMetrics();
  const metric = getMetric(metricKey);
  const subMetric = subMetricKey ? getMetric(subMetricKey) : undefined;

  // Only color the main metric if it's a percentage that shows sign (e.g. avgGain)
  const mainColorClass = option === "percentage" && showSign ? valueColorClass(metric) : "";

  // Sub-metrics (changes) always get color
  const subColorClass = subMetric !== undefined ? valueColorClass(subMetric) : "";

  return (
    <BaseCard
      className={twMerge(
        "flex flex-row py-2 justify-between items-center h-auto gap-3",
        "sm:items-baseline sm:flex-col sm:min-w-48 sm:gap-1",
        selected && "ring-2 ring-blue-500 bg-blue-50/5",
      )}
      onClick={onSelect}
    >
      <div className="text-sm">{title}</div>
      <div className="flex flex-row items-baseline gap-1">
        <div className={twMerge("font-mono text-lg font-semibold sm:text-2xl", mainColorClass)}>
          {formatValue(metric, option, showSign)}
        </div>
        {subMetric !== undefined && (
          <div className={twMerge("font-mono text-sm", subColorClass)}>
            {formatValue(subMetric, subOption, true)}
          </div>
        )}
      </div>
    </BaseCard>
  );
}

export default CoreMetricCard;