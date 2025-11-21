"use server";

import { TradingCenter } from "@/types/dt";
import { auth } from "@mm-app/auth/server";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { getTradingCenters } from "../db-queries/trading-centers";
import { MM_DB, mmCollections } from "../db/config";
import mongoClient from "../db/mongodb";
import { isStringEmpty } from "../utils";

export const updateTradingCenter = async (
  id: string,
  data: Partial<TradingCenter>,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return {
      success: false,
      message: "Not logged in.",
    };
  }

  if (isStringEmpty(id)) {
    return {
      success: false,
      message: "No ID provided",
    };
  }

  // Get trading centers for validation
  const tradingCenters = await getTradingCenters();
  if (!tradingCenters.success) {
    return {
      success: false,
      message: "Failed to get trading centers list",
    };
  }

  // Validate if trading center is valid
  const tradingCenterData = tradingCenters.data?.find((tc) => tc._id === id);
  if (!tradingCenterData) {
    return {
      success: false,
      message: "Trading center not found",
    };
  }

  const db = mongoClient.db(MM_DB);
  const collection = db.collection(mmCollections.tradingCenters);

  const allowedUpdateFields = [
    "name",
    "longName",
    "facebookPage",
  ] as unknown as (keyof TradingCenter)[];
  const updateData: Partial<TradingCenter> = {};

  for (const field of allowedUpdateFields) {
    if (field in data) {
      updateData[field] = data[field];
    }
  }

  try {
    const res = await collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...updateData,
        },
      },
    );
    if (!res.acknowledged) {
      throw new Error("Failed to update trading center");
    }

    revalidateTag("get-trading-centers", "max");

    return {
      success: true,
      message: "Trading center updated successfully",
    };
  } catch (err) {
    console.error("Failed to update trading center", err);

    return {
      success: false,
      error: "Failed to update trading center",
    };
  }
};
