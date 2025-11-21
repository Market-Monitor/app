"use server";

import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getMmDb, tdCollections } from "@/lib/db/config";
import mongoClient from "@/lib/db/mongodb";
import { isStringEmpty } from "@/lib/utils";
import { ActionReturnType } from "@/types/action-type";
import { auth } from "@mm-app/auth/server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

/**
 * Add / set new vegetables in the database
 *
 * @param data
 * @param tradingCenter
 * @returns
 */
export const updateVegetables = async (
  data: { [key: string]: string },
  tradingCenter: string,
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

  if (Object.keys(data).length === 0) {
    return {
      success: false,
      message: "Data is not a valid JSON object",
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

  const dataToInsert: {
    name: string;
    id: string;
    tradingCenter: string;
  }[] = [];

  try {
    for (const [name, id] of Object.entries(data)) {
      if (isStringEmpty(name) || isStringEmpty(id)) {
        console.error("[Add Vegetables] Data is not valid ::> ", name, id);
        return {
          success: false,
          message: "[Add Vegetables] Data is not valid",
        };
      }

      dataToInsert.push({
        name,
        id,
        tradingCenter: tradingCenter,
      });
    }

    // TODO: remove console.logs
    console.log(
      "[Add Vegetables] Data items to insert ::> ",
      dataToInsert.length,
    );

    const addData = await veggiesCol.insertMany(dataToInsert);
    if (!addData.acknowledged) {
      console.error("[Add Vegetables] Failed to add data ::> ", dataToInsert);
      return {
        success: false,
        message: "[Add Vegetables] Failed to add data",
      };
    }

    revalidateTag("get-app-stats", "max");
    revalidateTag("get-trading-centers", "max");

    return {
      success: true,
    };
  } catch (err) {
    console.error("Error updating vegetables:", err);
    return {
      success: false,
      message: "Failed to update vegetables :> " + err,
    };
  }
};
