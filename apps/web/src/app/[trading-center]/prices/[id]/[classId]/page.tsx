import InfoPriceCard from "@/components/info-cards/price-info";
import { veggiesAPI } from "@/lib/veggies-api/client";
import PricesChartContainer from "@/modules/prices/chart-container";
import PricesListHistory from "@/modules/prices/list-history";
import PricesVeggieData from "@/modules/prices/veggie-data";
import { Card } from "@mm-app/ui/components/card";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async (props: {
  params: Promise<{
    id: string;
    classId: string;
    "trading-center": string;
  }>;
}): Promise<Metadata> => {
  const params = await props.params;

  const veggieData = await veggiesAPI.getVeggie(params["trading-center"], {
    veggieId: params.id,
  });

  if (!veggieData.success) {
    return notFound();
  }

  return {
    title: `${veggieData.data.name} Prices`,
    description: `Latest prices for ${veggieData.data.name}`,
  };
};

export default async function VeggieIdPricePage(props: {
  params: Promise<{
    id: string;
    classId: string;
    "trading-center": string;
  }>;
}) {
  const params = await props.params;
  const tradingCenter = params["trading-center"];

  const veggieData = await veggiesAPI.getVeggie(tradingCenter, {
    veggieId: params.id,
  });
  if (!veggieData.success) {
    return notFound();
  }

  const veggieClassPrices = await veggiesAPI.getVeggiePrices(tradingCenter, {
    veggieId: params.id,
    veggieClassId: params.classId,
  });
  if (!veggieClassPrices.success || veggieClassPrices.data == null) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      <InfoPriceCard />

      <Card className="flex flex-col gap-6 lg:gap-0">
        <PricesVeggieData
          veggieData={veggieData.data}
          params={params}
          pricesData={veggieClassPrices.data}
        />

        <PricesChartContainer
          pricesData={veggieClassPrices.data}
          veggieName={veggieData.data.name}
        />
      </Card>

      <PricesListHistory pricesData={veggieClassPrices.data} />
    </div>
  );
}
