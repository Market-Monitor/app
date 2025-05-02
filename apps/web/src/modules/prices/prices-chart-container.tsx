"use client";

import { VeggiePrice } from "@mm-app/internal/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/ui/card";
import { useCallback, useState } from "react";
import { PricesChart } from "./prices-chart";
import PricesChartFilter, { ChartDatesFilter } from "./prices-chart-filter";

export default function PricesChartContainer(props: {
  pricesData: VeggiePrice[];
  veggieName: string;
}) {
  const [dateFilter, setDateFilter] = useState<ChartDatesFilter>("all");

  const filterPrices = useCallback(() => {
    const now = new Date().getTime();
    const filterDate = new Date();

    switch (dateFilter) {
      case "last7days":
        filterDate.setDate(filterDate.getDate() - 7);
        break;
      case "last30days":
        filterDate.setDate(filterDate.getDate() - 30);
        break;
      default:
        return props.pricesData;
    }

    return props.pricesData.filter(
      (item) => item.dateUnix >= filterDate.getTime() && item.dateUnix <= now,
    );
  }, [dateFilter, props.pricesData]);

  return (
    <CardContent className="lg:col-span-2 p-3 h-full">
      <Card>
        <CardHeader className="p-2 md:p-4 xl:p-6">
          <div className="flex items-center justify-between">
            <CardTitle>Chart History</CardTitle>

            <div>
              <PricesChartFilter value={dateFilter} onChange={setDateFilter} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="h-full p-0 pb-6">
          <PricesChart
            pricesData={filterPrices().map((item) => ({
              ...item,
              price: (item.price.length === 1
                ? [item.price[0], item.price[0]]
                : item.price) as number[],
            }))}
            veggieName={props.veggieName}
          />
        </CardContent>
      </Card>
    </CardContent>
  );
}
