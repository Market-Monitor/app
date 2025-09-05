import { veggiesAPI } from "@/lib/veggies-api/client";
import HomeHeroHeader from "@/modules/home/hero-header";
import HomeLatestPricesData from "@/modules/home/latest-data";
import LatestPricesContainer from "@/modules/home/latest-prices-container";
import { VeggieCategory } from "@mm-app/internal/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgriTrakPH - View Vegetable Prices for Farmers",
  description: "",
};

export default async function Page(props: PageProps<"/[trading-center]">) {
  const tradingCenter = (await props.params)["trading-center"];
  const latestPricesData = await veggiesAPI.getLatestPrices(tradingCenter);

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-12 w-full space-y-12">
        <HomeHeroHeader
          latestDataDate={
            latestPricesData.success
              ? latestPricesData.data.latestDataDate
              : undefined
          }
        />

        {latestPricesData.success ? (
          <LatestPricesContainer>
            {tradingCenter === "baptc" ? (
              <>
                <HomeLatestPricesData
                  tradingCenter={tradingCenter}
                  latestPrices={{
                    data: latestPricesData.data.data.filter(
                      (item) => item.category === VeggieCategory.Solid,
                    ),
                    latestDataDate: latestPricesData.data.latestDataDate,
                  }}
                  category={VeggieCategory.Solid}
                />

                <HomeLatestPricesData
                  tradingCenter={tradingCenter}
                  latestPrices={{
                    data: latestPricesData.data.data.filter(
                      (item) => item.category === VeggieCategory.SariSari,
                    ),
                    latestDataDate: latestPricesData.data.latestDataDate,
                  }}
                  category={VeggieCategory.SariSari}
                />
              </>
            ) : (
              <>
                <HomeLatestPricesData
                  tradingCenter={tradingCenter}
                  latestPrices={{
                    data: latestPricesData.data.data,
                    latestDataDate: latestPricesData.data.latestDataDate,
                  }}
                />
              </>
            )}
          </LatestPricesContainer>
        ) : (
          <pre>Failed to load latest prices</pre>
        )}
      </div>
    </div>
  );
}
