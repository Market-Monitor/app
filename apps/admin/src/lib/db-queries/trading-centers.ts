import "server-only";

import {
  GetTradingCenters,
  TradingCenter,
  TradingCenterConfig,
} from "@/types/dt";
import { WithId } from "mongodb";
import { unstable_cache } from "next/cache";
import { getMmDb, MM_DB, mmCollections, tdCollections } from "../db/config";
import mongoClient from "../db/mongodb";

export const getTradingCenters = unstable_cache(
  async (): Promise<
    | {
        success: false;
        error: string;
      }
    | {
        success: true;
        data: GetTradingCenters[];
      }
  > => {
    try {
      const db = mongoClient.db(MM_DB);
      const collection = db.collection(mmCollections.tradingCenters);

      const tradingCenters = (await collection
        .find()
        .toArray()) as WithId<TradingCenter>[];

      const mapTDS = await Promise.all(
        tradingCenters.map(async (item) => {
          const tdDB = mongoClient.db(getMmDb(item.slug));
          const configCol = tdDB.collection(tdCollections.configurations);

          const config = (await configCol.findOne({
            configId: 0,
          })) as WithId<TradingCenterConfig>;
          return {
            ...item,
            config: {
              ...config,
              _id: undefined,
            },
          };
        }),
      );

      return {
        success: true,
        data: mapTDS.map((item) => ({
          ...item,
          _id: item._id.toString(),
        })) as GetTradingCenters[],
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
