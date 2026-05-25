import BaseCard from "@/components/cards/base-card";
import { useMarketMetrics } from "@/hooks/useMarketMetrics";
import { useEffect, useRef } from "react";
import { createChart, ColorType, AreaSeries, type AreaData, type UTCTimestamp } from "lightweight-charts";

/** Subset of MarketMetrics keys that have chart data. */
export type ChartMetricKey = "avgGain" | "btcDominance" | "totalVolume" | "marketCap";

export type CoreMetricChartProps = {
  metricKey: ChartMetricKey;
};

const CHART_COLORS: Record<ChartMetricKey, { line: string; area: string }> = {
  avgGain: { line: "#22c55e", area: "rgba(34, 197, 94, 0.2)" },
  btcDominance: { line: "#f59e0b", area: "rgba(245, 158, 11, 0.2)" },
  totalVolume: { line: "#3b82f6", area: "rgba(59, 130, 246, 0.2)" },
  marketCap: { line: "#8b5cf6", area: "rgba(139, 92, 246, 0.2)" },
};

const POINTS = 30;

function generateDummyData(base: number): AreaData<UTCTimestamp>[] {
  const data: AreaData<UTCTimestamp>[] = [];
  const now = Math.floor(Date.now() / 1000);
  for (let i = 0; i < POINTS; i++) {
    const noise = (Math.random() - 0.5) * base * 0.12;
    const trend = Math.sin((i / POINTS) * Math.PI * 2) * base * 0.04;
    const value = Math.round((base + noise + trend) * 100) / 100;
    data.push({
      time: (now - (POINTS - 1 - i) * 86400) as UTCTimestamp, // 1 point per day
      value,
    });
  }
  return data;
}

function CoreMetricChart({ metricKey }: CoreMetricChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getMetric } = useMarketMetrics();
  const colors = CHART_COLORS[metricKey];

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight || 200,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#6b7280",
        fontSize: 11,
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        visible: true,
        timeVisible: false,
        borderVisible: false,
        barSpacing: 8,
        lockVisibleTimeRangeOnResize: true,
      },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      handleScroll: false,
      handleScale: false,
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: colors.line,
      topColor: colors.area,
      bottomColor: "rgba(255, 255, 255, 0)",
      lineWidth: 2,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    const metric = getMetric(metricKey);
    const data = generateDummyData(metric || 0);
    series.setData(data);
    chart.timeScale().fitContent();

    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metricKey]);

  return (
    <BaseCard className="h-full">
      <div ref={containerRef} className="w-full h-full min-h-60" />
    </BaseCard>
  );
}

export default CoreMetricChart;