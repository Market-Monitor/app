"use server";

import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getMmDb, tdCollections } from "@/lib/db/config";
import mongoClient from "@/lib/db/mongodb";
import { auth } from "@mm-app/auth/server";
import { VeggiePrice } from "@mm-app/internal/api";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const updateVeggieHistoryPrice = async (
  data: Partial<VeggiePrice>,
  tradingCenter: string,
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

  if (Object.keys(data).length === 0) {
    return {
      success: false,
      message: "No updates provided",
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
  const tradingCenterData = tradingCenters.data?.find(
    (tc) => tc.slug === tradingCenter,
  );
  if (!tradingCenterData) {
    return {
      success: false,
      message: "Trading center not found",
    };
  }

  const db = mongoClient.db(getMmDb(tradingCenter));
  const historyPricesCol = db.collection(tdCollections.historyPrices);

  try {
    const { _id, ...updateData } = data;
    if (!_id) {
      throw new Error("No ID provided");
    }

    // Update the history price
    const res = await historyPricesCol.updateOne(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          ...updateData,
        },
      },
    );
    if (!res.acknowledged) {
      throw new Error("Failed to update history price");
    }

    revalidatePath("/dashboard/data-management/historical-prices");

    return {
      success: true,
      message: "History price updated successfully",
    };
  } catch (err) {
    console.error("Error updating history price:", err);

    return {
      success: false,
      error: "Failed to update history price :> " + err,
    };
  }
};
