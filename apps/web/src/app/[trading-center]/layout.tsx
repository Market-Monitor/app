import { veggiesAPI } from "@/lib/veggies-api/client";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{
    "trading-center": string;
  }>;
}) {
  const tradingCenter = (await params)["trading-center"];

  const tradingCenters = await veggiesAPI.getTradingCenters();
  if (!tradingCenters.success) {
    return notFound();
  }

  // Check if the trading center exists
  if (!tradingCenters.data.some((item) => item.slug === tradingCenter)) {
    return notFound();
  }

  return <>{children}</>;
}
