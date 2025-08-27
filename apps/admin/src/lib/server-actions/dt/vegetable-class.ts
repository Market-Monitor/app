"use server";

import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getMmDb, tdCollections } from "@/lib/db/config";
import mongoClient from "@/lib/db/mongodb";
import { auth } from "@mm-app/auth/server";
import { Veggie, VeggieClass, VeggiePrice } from "@mm-app/internal/api";
import { ObjectId, WithId } from "mongodb";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

/**
 * Update a vegetable in the database
 *
 * @param data
 * @param tradingCenter
 * @returns
 */
export const updateVegetableClass = async (
  data: Partial<VeggieClass>,
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
  const veggiesCol = db.collection(tdCollections.veggies);
  const veggieClassCol = db.collection(tdCollections.veggiesClasses);
  const historyPriceCol = db.collection(tdCollections.historyPrices);

  try {
    const { _id, ...updates } = data;
    if (!_id) {
      throw new Error("No ID provided");
    }

    if (Object.keys(updates).length === 0) {
      return {
        success: true,
        message: "No updates provided",
      };
    }

    // Get veggie class
    const veggieClass = (await veggieClassCol.findOne({
      _id: new ObjectId(_id),
    })) as WithId<VeggieClass> | null;
    if (!veggieClass) {
      throw new Error("Veggie class not found");
    }

    // Get parent id
    const parentVeggie = (await veggiesCol.findOne({
      id: veggieClass.parentId,
    })) as WithId<Veggie> | null;
    if (!parentVeggie) {
      throw new Error("Veggie not found");
    }

    const historyChildrenUpdates: Partial<VeggiePrice> = {
      name: updates.name?.replace(parentVeggie.name, "").trim(),
    };

    // Update veggie class in the database
    const updateClass = await veggieClassCol.updateOne(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          ...updates,
        },
      },
    );
    if (!updateClass.acknowledged) {
      throw new Error("Failed to update veggie class");
    }

    // Update history prices
    const updateHistory = await historyPriceCol.updateMany(
      {
        id: veggieClass.id,
        parentId: parentVeggie.id,
      },
      {
        $set: {
          ...historyChildrenUpdates,
        },
      },
    );
    if (!updateHistory.acknowledged) {
      throw new Error("Failed to update history prices children");
    }

    // Revalidate cache
    revalidatePath("/dashboard/data-management/vegetable-categories");

    return {
      success: true,
      message: "Veggie class updated successfully",
    };
  } catch (err) {
    console.error("Error updating veggie class:", err);
    return {
      success: false,
      message: "Failed to update veggie class: " + err,
    };
  }
};
