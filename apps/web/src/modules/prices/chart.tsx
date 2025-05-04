"use client";

import PesoSign from "@/components/peso-sign";
import { VeggiePrice } from "@mm-app/internal/api";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@mm-app/ui/components/chart";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@mm-app/ui/components/tooltip";
import { useMediaQuery } from "@react-hookz/web";
import FileSaver from "file-saver";
import { useCallback } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useCurrentPng } from "recharts-to-png";

const chartConfig = {
  high: {
    label: "High",
    color: "var(--chart-1)",
  },
  low: {
    label: "Low",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const PricesChart = (props: {
  pricesData: VeggiePrice[];
  veggieName: string;
}) => {
  const chartData = props.pricesData
    .sort((a, b) => a.dateUnix - b.dateUnix)
    .map((item) => ({
      date: new Date(item.dateUnix).toISOString(),
      high: item.price[1],
      low: item.price[0],
    }));

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [getDivPng, { ref, isLoading }] = useCurrentPng();

  const handleDownloadChart = useCallback(async () => {
    const png = await getDivPng();
    if (png) {
      FileSaver.saveAs(
        png,
        `${props.veggieName.replaceAll(" ", "_").toLowerCase()}-chart.png`,
      );
    }
  }, [getDivPng, props.veggieName]);

  return (
    <div className="space-y-2">
      <ChartContainer config={chartConfig} className="min-h-[500px] w-full">
        <AreaChart
          ref={ref}
          accessibilityLayer
          data={chartData}
          margin={{ left: 0, right: 0, top: 4 }}
          className="bg-card pt-4"
        >
          <defs>
            <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-high)" stopOpacity={1} />
              <stop
                offset="95%"
                stopColor="var(--color-high)"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-low)" stopOpacity={1} />
              <stop offset="95%" stopColor="var(--color-low)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />

          {isDesktop ? (
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₱${value}`}
              padding={{ top: 25 }}
            />
          ) : (
            <></>
          )}

          <CartesianGrid strokeDasharray="3 3" />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  const date = new Date(value);

                  return (
                    <div className="flex items-center space-x-3">
                      <span>
                        {date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>

                      <span>[Prices]</span>
                    </div>
                  );
                }}
                indicator="dot"
                indicatorPreValueLabel={<PesoSign />}
              />
            }
          />
          <Area
            type="natural"
            dataKey="high"
            stroke="var(--color-high)"
            fillOpacity={1}
            fill="url(#colorHigh)"
          />
          <Area
            type="natural"
            dataKey="low"
            stroke="var(--color-low)"
            fillOpacity={1}
            fill="url(#colorLow)"
          />

          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>

      <div className="px-4 flex justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleDownloadChart}
              className="text-xs text-muted-foreground hover:underline"
              disabled={isLoading}
            >
              {isLoading ? "Generating image..." : "Download Chart"}
            </button>
          </TooltipTrigger>

          <TooltipContent>
            Download chart as PNG. (Resolution depends on your device)
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
