import "server-only";

import { AppStats, TradingCenter, TradingCenterStats } from "@/types/dt";
import { WithId } from "mongodb";
import { unstable_cache } from "next/cache";
import { getMmDb, MM_DB, mmCollections, tdCollections } from "../db/config";
import mongoClient from "../db/mongodb";

export const getAppStats = unstable_cache(
  async () => {
    try {
      const mmDb = mongoClient.db(MM_DB);

      const result: AppStats = {
        assets: 0,
        tradingCenters: [],
      };

      // Count trading centers
      const tradingCenters = (await mmDb
        .collection(mmCollections.tradingCenters)
        .find()
        .toArray()) as WithId<TradingCenter>[];
      const assets = await mmDb
        .collection(mmCollections.assets)
        .countDocuments();

      // Count from each trading centers
      for (const item of tradingCenters) {
        const tdDb = mongoClient.db(getMmDb(item.slug));

        const priceUpdates = await tdDb
          .collection(tdCollections.historyPrices)
          .countDocuments();
        const vegetables = await tdDb
          .collection(tdCollections.veggies)
          .countDocuments();
        const vegetableCategories = await tdDb
          .collection(tdCollections.veggiesClasses)
          .countDocuments();

        const d: TradingCenterStats = {
          priceUpdates: priceUpdates,
          vegetables: vegetables,
          vegetableCategories: vegetableCategories,
          slug: item.slug,
          name: item.name,
        };

        result.tradingCenters.push(d);
      }

      result.assets = assets;

      return {
        success: true,
        data: result,
      };
    } catch (err) {
      console.error("Error fetching app stats:", err);
      return {
        success: false,
        error: "Failed to fetch app stats :> " + err,
      };
    }
  },
  ["get-app-stats"],
  { tags: ["get-app-stats"] },
);
