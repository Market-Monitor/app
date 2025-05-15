import Footer from "@/components/footer";
import Header from "@/components/header";
import { veggiesAPI } from "@/lib/veggies-api/client";
import { AppProvider } from "@/providers/app-provider";
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
  const td = tradingCenters.data.find((item) => item.slug === tradingCenter);
  if (!td) {
    return notFound();
  }

  return (
    <AppProvider tradingCenter={tradingCenter} tradingCenterData={td}>
      <Header tradingCenter={tradingCenter} />

      <main className="w-11/12 lg:w-5/6 mx-auto my-12">{children}</main>

      <Footer />
    </AppProvider>
  );
}
