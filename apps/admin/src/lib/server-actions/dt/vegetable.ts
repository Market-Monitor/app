"use server";

import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getMmDb, tdCollections } from "@/lib/db/config";
import mongoClient from "@/lib/db/mongodb";
import { auth } from "@mm-app/auth/server";
import { Veggie } from "@mm-app/internal/api";
import { ObjectId, WithId } from "mongodb";
import { revalidatePath } from "next/cache";
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
    // Do not return latest data, for we need the old name to update classes and history prices
    const res = (await veggiesCol.findOneAndUpdate(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          ...updates,
        },
      },
    )) as WithId<Veggie> | null;
    if (!res) {
      throw new Error("Failed to update veggie");
    }

    // If name is provided, we update all children in VeggieClass and HistoryPrice
    if (veggie.name != null && veggie.name !== "") {
      console.log(
        "[i] Updating veggie classes and history prices with new name ::",
        veggie.name,
        res,
      );

      const veggiesClassesCol = db.collection(tdCollections.veggiesClasses);
      const historyPricesCol = db.collection(tdCollections.historyPrices);

      // Update all veggie classes with the new name
      const upClasses = await veggiesClassesCol.updateMany(
        { parentId: res.id },
        [
          {
            $set: {
              parentName: veggie.name,
              name: {
                $replaceOne: {
                  input: "$name",
                  find: res.name,
                  replacement: veggie.name,
                },
              },
            },
          },
        ],
      );
      if (!upClasses.acknowledged) {
        throw new Error("Failed to update veggie classes");
      }

      // Update all history prices with the new name
      const upPrices = await historyPricesCol.updateMany(
        { parentId: res.id },
        { $set: { parentName: veggie.name } },
      );
      if (!upPrices.acknowledged) {
        throw new Error("Failed to update history prices");
      }

      // Revalidate cache for veggie classes and history prices
      revalidatePath("/dashboard/data-management/vegetable-categories");
      revalidatePath("/dashboard/data-management/historical-prices");
    }

    // Revalidate cache
    revalidatePath("/dashboard/data-management/vegetables");

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
