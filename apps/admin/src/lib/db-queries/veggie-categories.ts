import "server-only";

import { TradingCenter } from "@/types/dt";
import { VeggieClass } from "@mm-app/internal/api";
import { WithId } from "mongodb";
import { getMmDb, MM_DB, mmCollections, tdCollections } from "../db/config";
import mongoClient from "../db/mongodb";

export const getAllVeggieCategories = async () => {
  try {
    const db = mongoClient.db(MM_DB);
    const tdCol = db.collection(mmCollections.tradingCenters);

    const tradingCenters = (await tdCol
      .find()
      .toArray()) as WithId<TradingCenter>[];

    const allVeggies: {
      tradingCenter: string;
      data: VeggieClass[];
    }[] = [];
    for (const item of tradingCenters) {
      const tdDb = mongoClient.db(getMmDb(item.slug));
      const veggieCatsCol = tdDb.collection(tdCollections.veggiesClasses);

      const veggies = (await veggieCatsCol.find().toArray()) as WithId<
        Omit<VeggieClass, "_id">
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
    console.error("Error fetching veggie categories:", err);
    return {
      success: false,
      error: "Failed to fetch veggie categories :> " + err,
    };
  }
};
