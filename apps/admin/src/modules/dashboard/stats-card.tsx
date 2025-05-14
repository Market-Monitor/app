"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";
import { useMemo } from "react";
import { useAppStats } from "./stats-provider";

export default function StatsCards() {
  const { appStats, selection } = useAppStats();

  const selectionName = useMemo(() => {
    if (selection === "all") {
      return "All Trading Centers";
    } else {
      const selectedTradingCenter = appStats.tradingCenters.find(
        (item) => item.slug === selection,
      );
      return selectedTradingCenter ? selectedTradingCenter.name : "";
    }
  }, [appStats.tradingCenters, selection]);

  const priceUpdates = useMemo(() => {
    if (selection === "all") {
      return appStats.tradingCenters.reduce(
        (acc, item) => acc + item.priceUpdates,
        0,
      );
    } else {
      const selectedTradingCenter = appStats.tradingCenters.find(
        (item) => item.slug === selection,
      );
      return selectedTradingCenter ? selectedTradingCenter.priceUpdates : 0;
    }
  }, [appStats.tradingCenters, selection]);

  const vegetables = useMemo(() => {
    if (selection === "all") {
      return appStats.tradingCenters.reduce(
        (acc, item) => acc + item.vegetables,
        0,
      );
    } else {
      const selectedTradingCenter = appStats.tradingCenters.find(
        (item) => item.slug === selection,
      );
      return selectedTradingCenter ? selectedTradingCenter.vegetables : 0;
    }
  }, [appStats.tradingCenters, selection]);

  const vegetableCategories = useMemo(() => {
    if (selection === "all") {
      return appStats.tradingCenters.reduce(
        (acc, item) => acc + item.vegetableCategories,
        0,
      );
    } else {
      const selectedTradingCenter = appStats.tradingCenters.find(
        (item) => item.slug === selection,
      );
      return selectedTradingCenter
        ? selectedTradingCenter.vegetableCategories
        : 0;
    }
  }, [appStats.tradingCenters, selection]);

  return (
    <div className="grid grid-cols-3 gap-8">
      <Card>
        <CardHeader>
          <CardDescription>Vegetables</CardDescription>
          <CardTitle className="text-5xl font-black">{vegetables}</CardTitle>
        </CardHeader>
        <CardFooter>
          {selection === "all" ? (
            <CardDescription>
              Total number of vegetables across all trading centers
            </CardDescription>
          ) : (
            <CardDescription>
              Total number of vegetables in {selectionName} trading center
            </CardDescription>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Vegetable Categories</CardDescription>
          <CardTitle className="text-5xl font-black">
            {vegetableCategories}
          </CardTitle>
        </CardHeader>

        <CardFooter>
          {selection === "all" ? (
            <CardDescription>
              Total number of vegetable categories across all trading centers
            </CardDescription>
          ) : (
            <CardDescription>
              Total number of vegetable categories in {selectionName} trading
              center
            </CardDescription>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Price Entries</CardDescription>
          <CardTitle className="text-5xl font-black">{priceUpdates}</CardTitle>
        </CardHeader>

        <CardFooter>
          {selection === "all" ? (
            <CardDescription>
              Total number of vegetable price entries across all trading centers
            </CardDescription>
          ) : (
            <CardDescription>
              Total number of vegetable price entries in {selectionName} trading
              center
            </CardDescription>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
