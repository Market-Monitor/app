"use server";

import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getMmDb, tdCollections } from "@/lib/db/config";
import mongoClient from "@/lib/db/mongodb";
import { isStringEmpty } from "@/lib/utils";
import { ActionReturnType } from "@/types/action-type";
import { auth } from "@mm-app/auth/server";
import { headers } from "next/headers";

/**
 * Add / set new vegetable categories in the database
 *
 * @param data
 * @param tradingCenter
 * @returns
 */
export const updateVegetableCategories = async (
  data: {
    [key: string]: {
      id: string;
      parentId: string;
    };
  },
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
  const veggieClassesCol = db.collection(tdCollections.veggiesClasses);

  const dataToInsert: {
    name: string;
    id: string;
    parentId: string;
    tradingCenter: string;
  }[] = [];

  try {
    for (const [name, ids] of Object.entries(data)) {
      if (
        isStringEmpty(name) ||
        isStringEmpty(ids.id) ||
        isStringEmpty(ids.parentId)
      ) {
        console.error(
          "[Add Vegetable Categories] Data is not valid ::> ",
          name,
          ids,
        );
        return {
          success: false,
          message: "[Add Vegetable Categories] Data is not valid",
        };
      }

      dataToInsert.push({
        name,
        id: ids.id,
        parentId: ids.parentId,
        tradingCenter,
      });
    }

    // TODO: remove console.logs
    console.log(
      "[Add Vegetable Categories] Data items to insert ::> ",
      dataToInsert.length,
    );

    const addData = await veggieClassesCol.insertMany(dataToInsert);
    if (!addData.acknowledged) {
      console.error("[Add Vegetable Categories] Error ::> ", addData);
      return {
        success: false,
        message: "[Add Vegetable Categories] Error",
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error("[Add Vegetable Categories] Error ::> ", err);
    return {
      success: false,
      message: "[Add Vegetable Categories] Error",
    };
  }
};
