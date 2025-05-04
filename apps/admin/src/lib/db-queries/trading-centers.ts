import "server-only";

import { TradingCenter } from "@/types/dt";
import { WithId } from "mongodb";
import { unstable_cache } from "next/cache";
import { MM_DB, mmCollections } from "../db/config";
import mongoClient from "../db/mongodb";

export const getTradingCenters = unstable_cache(
  async () => {
    try {
      const db = mongoClient.db(MM_DB);
      const collection = db.collection(mmCollections.tradingCenters);

      const tradingCenters = (await collection
        .find()
        .toArray()) as WithId<TradingCenter>[];

      return {
        success: true,
        data: tradingCenters,
      };
    } catch (err) {
      console.error("Error fetching trading centers:", err);
      return {
        success: false,
        error: "Failed to fetch trading centers :> " + err,
      };
    }
  },
  ["get-trading-centers"],
  { tags: ["get-trading-centers"] },
);
