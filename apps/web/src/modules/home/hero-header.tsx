"use client";

import { useAppData } from "@/providers/app-provider";

export default function HomeHeroHeader(props: { latestDataDate?: string }) {
  const { tradingCenterData } = useAppData();

  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-black leading-normal">
        <span className="text-primary text-5xl">
          {tradingCenterData.longName}
        </span>
        <br /> Monitored Wholesale Prices
      </h1>
      {props.latestDataDate ? (
        <div className="">
          <p className="text-lg">
            Latest available vegetable prices for
            <br className="block md:hidden" />{" "}
            <strong className="underline">
              {new Date(props.latestDataDate).toLocaleString("en-PH", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              (
              {new Date(props.latestDataDate).toLocaleString("en-PH", {
                weekday: "long",
              })}
              )
            </strong>{" "}
          </p>

          <p>
            Prices are for <strong>Farmers</strong> reference only. All prices
            may change anytime.
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
