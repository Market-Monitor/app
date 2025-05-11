"use server";

import { MM_DB, mmCollections } from "@/lib/db/config";
import mongoClient from "@/lib/db/mongodb";
import { ActionReturnType } from "@/types/action-type";
import { Asset } from "@/types/dt";
import { auth } from "@mm-app/auth/server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export const saveAssetUploadToDB = async (
  asset: Partial<Asset>,
): Promise<ActionReturnType> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return {
      success: false,
      message: "Not logged in.",
    };
  }

  const db = mongoClient.db(MM_DB);
  const collection = db.collection(mmCollections.assets);

  try {
    const newAsset = {
      ...asset,
      _id: undefined,
    };

    const addAsset = await collection.insertOne(newAsset);
    if (!addAsset.acknowledged) {
      return {
        success: false,
        message: "Failed to add asset, addAsset.acknowledged is false",
      };
    }

    // Invalidate caches
    revalidateTag("get-assets");

    return {
      success: true,
    };
  } catch (err) {
    console.error("Error adding asset:", err);
    return {
      success: false,
      message: "Failed to add asset",
    };
  }
};
