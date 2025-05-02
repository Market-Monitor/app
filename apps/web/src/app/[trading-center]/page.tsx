import { veggiesAPI } from "@/lib/veggies-api/client";
import HomeLatestPricesData from "@/modules/home/latest-data";
import LatestPricesContainer from "@/modules/home/latest-prices-container";
import { VeggieCategory } from "@mm-app/internal/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Monitor",
  description: "",
};

export default async function Page(props: {
  params: Promise<{
    "trading-center": string;
  }>;
}) {
  const tradingCenter = (await props.params)["trading-center"];
  const latestPricesData = await veggiesAPI.getLatestPrices(tradingCenter);

  return (
    <main className="w-5/6 mx-auto">
      <div className="flex flex-col items-center justify-center py-12 w-full space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-black leading-normal lg:leading-loose">
            <span className="text-primary">BAPTC</span> Monitored Wholesale
            Prices
          </h1>
          {latestPricesData.success ? (
            <div className="">
              <p className="text-lg">
                Latest available vegetable prices for
                <br className="block md:hidden" />{" "}
                <strong className="underline">
                  {new Date(
                    latestPricesData.data.latestDataDate,
                  ).toLocaleString("en-PH", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  (
                  {new Date(
                    latestPricesData.data.latestDataDate,
                  ).toLocaleString("en-PH", {
                    weekday: "long",
                  })}
                  )
                </strong>{" "}
              </p>

              <p>
                Prices are for <strong>Farmers</strong> reference only. All
                prices may change anytime.
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>

        {latestPricesData.success ? (
          <LatestPricesContainer>
            <HomeLatestPricesData
              latestPrices={{
                data: latestPricesData.data.data.filter(
                  (item) => item.category === VeggieCategory.Solid,
                ),
                latestDataDate: latestPricesData.data.latestDataDate,
              }}
              category={VeggieCategory.Solid}
            />

            <HomeLatestPricesData
              latestPrices={{
                data: latestPricesData.data.data.filter(
                  (item) => item.category === VeggieCategory.SariSari,
                ),
                latestDataDate: latestPricesData.data.latestDataDate,
              }}
              category={VeggieCategory.SariSari}
            />
          </LatestPricesContainer>
        ) : (
          <pre>Failed to load latest prices</pre>
        )}
      </div>
    </main>
  );
}
