import { TradingCenter } from "@/types/dt";
import { Veggie } from "@mm-app/internal/api";
import { WithId } from "mongodb";
import { unstable_cache } from "next/cache";
import { getMmDb, MM_DB, mmCollections, tdCollections } from "../db/config";
import mongoClient from "../db/mongodb";

export const getAllVeggies = unstable_cache(
  async () => {
    try {
      const db = mongoClient.db(MM_DB);
      const tdCol = db.collection(mmCollections.tradingCenters);

      const tradingCenters = (await tdCol
        .find()
        .toArray()) as WithId<TradingCenter>[];

      const allVeggies: {
        tradingCenter: string;
        data: Veggie[];
      }[] = [];
      for (const item of tradingCenters) {
        const tdDb = mongoClient.db(getMmDb(item.slug));
        const veggieCol = tdDb.collection(tdCollections.veggies);

        const veggies = (await veggieCol.find().toArray()) as WithId<
          Omit<Veggie, "_id">
        >[];
        allVeggies.push({
          tradingCenter: item.slug,
          data: veggies.map((item) => ({
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
      console.error("Error fetching veggies:", err);
      return {
        success: false,
        error: "Failed to fetch veggies :> " + err,
      };
    }
  },
  ["get-all-veggies"],
  { tags: ["get-all-veggies"] },
);
