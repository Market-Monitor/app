import "server-only";

import { TradingCenter } from "@/types/dt";
import { VeggiePrice } from "@mm-app/internal/api";
import { WithId } from "mongodb";
import { getMmDb, MM_DB, mmCollections, tdCollections } from "../db/config";
import mongoClient from "../db/mongodb";

// NOTE: Cannot use `unstable_cache` here since output >2MB,
// TODO: Re-implement so we do not fetch all history prices at once
export const getAllHistoryPrices = async () => {
  try {
    const db = mongoClient.db(MM_DB);
    const tdCol = db.collection(mmCollections.tradingCenters);

    const tradingCenters = (await tdCol
      .find()
      .toArray()) as WithId<TradingCenter>[];

    const allVeggies: {
      tradingCenter: string;
      data: VeggiePrice[];
    }[] = [];
    for (const item of tradingCenters) {
      const tdDb = mongoClient.db(getMmDb(item.slug));
      const historyPricesCol = tdDb.collection(tdCollections.historyPrices);

      const historyPrices = (await historyPricesCol.find().toArray()) as WithId<
        Omit<VeggiePrice, "_id">
      >[];
      allVeggies.push({
        tradingCenter: item.slug,
        data: historyPrices.map((item) => ({
          ...item,
          _id: item._id.toString(),
        })),
      });
    }

    return {
      success: true,
      data: allVeggies,
    };
  } catch (err) {
    console.error("Error fetching history prices:", err);
    return {
      success: false,
      error: "Failed to fetch history prices :> " + err,
    };
  }
};
