"use server";

import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getMmDb, tdCollections } from "@/lib/db/config";
import mongoClient from "@/lib/db/mongodb";
import { auth } from "@mm-app/auth/server";
import { Veggie } from "@mm-app/internal/api";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

/**
 * Update a vegetable in the database
 *
 * @param veggie
 * @param tradingCenter
 * @returns
 */
export const updateVegetable = async (
  veggie: Partial<Veggie>,
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

  if (Object.keys(veggie).length === 0) {
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
  const veggiesCol = db.collection(tdCollections.veggies);

  try {
    const { _id, ...updates } = veggie;

    if (!_id) {
      throw new Error("No ID provided");
    }

    // Update veggie in the database
    const res = await veggiesCol.updateOne(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          ...updates,
        },
      },
    );
    if (!res.acknowledged) {
      throw new Error("Failed to update veggie");
    }

    // Revalidate cache
    revalidateTag("get-all-veggies");

    return {
      success: true,
      message: "Veggie updated successfully",
    };
  } catch (err) {
    console.error("Error updating veggie:", err);
    return {
      success: false,
      message: "Failed to update veggie: " + err,
    };
  }
};
