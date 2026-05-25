import { useState } from "react";
import type { MetricKey } from "@/store/marketStore";
import type { ChartMetricKey } from "./core-metric-chart/core-metric-chart";
import CoreMetricCard, { type MetricOption } from "./core-metric-card/core-metric-card";
import CoreMetricChart from "./core-metric-chart/core-metric-chart";
import DashboardSection from "@/components/sections/dashboard-section";

type CoreMetricItem = {
  title: string;
  metricKey: MetricKey;
  option: MetricOption;
  subMetricKey?: MetricKey;
  subOption?: MetricOption;
  showSign?: boolean;
};

const CORE_METRICS_DATA: CoreMetricItem[] = [
  {
    title: "Market Cap",
    metricKey: "marketCap",
    option: "abbreviation",
    subMetricKey: "marketCapChange",
    subOption: "percentage",
  },
  {
    title: "Total Market Volumn",
    metricKey: "totalVolume",
    option: "abbreviation",
    subMetricKey: "totalVolumeChange",
    subOption: "percentage",
  },
  { title: "Average Gain", metricKey: "avgGain", option: "percentage", showSign: true },
  {
    title: "Bitcoin Dominance",
    metricKey: "btcDominance",
    option: "percentage",
    subMetricKey: "btcDominanceChange",
    subOption: "percentage",
  },
];

const CHARTABLE_KEYS: Set<MetricKey> = new Set(["avgGain", "btcDominance", "totalVolume", "marketCap"]);

function CoreMetrics() {
  const [selectedMetric, setSelectedMetric] = useState<ChartMetricKey>("avgGain");

  return (
    <DashboardSection
      title="Summary"
      onTitleClick={() => {}}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-col gap-3">
          {CORE_METRICS_DATA.map((item) => (
            <CoreMetricCard
              key={item.metricKey}
              title={item.title}
              metricKey={item.metricKey}
              option={item.option}
              subMetricKey={item.subMetricKey}
              subOption={item.subOption}
              showSign={item.showSign}
              selected={item.metricKey === selectedMetric}
              onSelect={() => {
                if (CHARTABLE_KEYS.has(item.metricKey)) {
                  setSelectedMetric(item.metricKey as ChartMetricKey);
                }
              }}
            />
          ))}
        </div>
        <div className="flex-1 min-w-0 self-stretch min-h-60">
          <CoreMetricChart metricKey={selectedMetric} />
        </div>
      </div>
    </DashboardSection>
  );
}

export default CoreMetrics;