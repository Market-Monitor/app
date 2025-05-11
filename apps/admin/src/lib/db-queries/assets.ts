import "server-only";

import { Asset } from "@/types/dt";
import { WithId } from "mongodb";
import { unstable_cache } from "next/cache";
import { MM_DB, mmCollections } from "../db/config";
import mongoClient from "../db/mongodb";

export const getAssets = unstable_cache(
  async () => {
    try {
      const db = mongoClient.db(MM_DB);
      const collection = db.collection(mmCollections.assets);

      const assets = (await collection.find().toArray()) as WithId<Asset>[];

      return {
        success: true,
        data: assets,
      };
    } catch (err) {
      console.error("Error fetching assets:", err);
      return {
        success: false,
        error: "Failed to fetch assets :> " + err,
      };
    }
  },
  ["get-assets"],
  { tags: ["get-assets"] },
);
