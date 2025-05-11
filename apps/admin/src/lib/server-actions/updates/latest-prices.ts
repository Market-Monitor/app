"use server";

import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getMmDb, tdCollections } from "@/lib/db/config";
import mongoClient from "@/lib/db/mongodb";
import { isStringEmpty } from "@/lib/utils";
import { ActionReturnType } from "@/types/action-type";
import { auth } from "@mm-app/auth/server";
import { headers } from "next/headers";

export interface PriceDataSubData {
  name: string;
  price: number[];
  id: string;
  parentId: string;
}

export interface PriceDataData {
  name: string;
  data: PriceDataSubData[];
  category: string;
  id: string;
}

export interface PriceData {
  data: PriceDataData[];
  date: string;
  parsedDate: string;
}

/**
 * Update latest prices [history prices] in the database
 *
 * @param data
 * @param tradingCenter
 * @returns
 */
export const updateLatestPrices = async (
  data: PriceData[],
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

  if (!Array.isArray(data)) {
    return {
      success: false,
      message: "Data is not a valid JSON array",
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

  const datesCounts: { [key: string]: number } = {};
  const dataToInsert = [];
  let latestDataDate: string | null = null;

  try {
    for (const item of data) {
      for (const data of item.data) {
        for (const x of data.data) {
          // Skip if price is empty
          if (x.price.length === 0) {
            console.log("[Add Price Data] Skipping empty price ::>", x);
            continue;
          }

          if (tradingCenter === "baptc") {
            if (
              isStringEmpty(x.name) ||
              isStringEmpty(x.id) ||
              isStringEmpty(x.parentId) ||
              isStringEmpty(data.id) ||
              isStringEmpty(data.category) ||
              isStringEmpty(item.date)
            ) {
              console.error(
                "[Add Price Data] Data is not valid ::>",
                x,
                data,
                item,
              );
              return {
                success: false,
                message: "Data is not valid ::>" + item.date,
              };
            }
          } else {
            if (
              isStringEmpty(x.name) ||
              isStringEmpty(x.id) ||
              isStringEmpty(x.parentId) ||
              isStringEmpty(data.id) ||
              isStringEmpty(item.date)
            ) {
              console.error(
                "[Add Price Data] Data is not valid ::>",
                x,
                data,
                item,
              );
              return {
                success: false,
                message: "Data is not valid ::>" + item.date,
              };
            }
          }

          const newItem = {
            ...x,
            date: item.date,
            dateISO: item.parsedDate,
            dateUnix: new Date(item.parsedDate).getTime(),
            category: data.category,
            parentName: data.name,
            tradingCenter: tradingCenter,
          };

          if (datesCounts[newItem.dateUnix.toString()] == null) {
            const countDocsByDate = await historyPricesCol.countDocuments({
              dateUnix: newItem.dateUnix,
            });

            datesCounts[newItem.dateUnix.toString()] = countDocsByDate;

            if (countDocsByDate > 0) {
              // Skip
              console.log("[Add Price Data] Skipping ::>", newItem.id);
              continue;
            }
          } else {
            if ((datesCounts[newItem.dateUnix.toString()] ?? 0) > 0) {
              // Skip
              console.log("[Add Price Data] Skipping ::>", newItem.id);
              continue;
            }
          }

          dataToInsert.push(newItem);

          if (latestDataDate == null || item.parsedDate > latestDataDate) {
            latestDataDate = item.parsedDate;
          }
        }
      }
    }

    if (dataToInsert.length === 0) {
      return {
        success: false,
        message: "No new data to insert",
      };
    }

    // Update latest config in configs collection
    const configsCollection = db.collection(tdCollections.configurations);
    const latestConfig = await configsCollection.findOne({
      configId: 0,
    });

    // TODO: remove console.logs
    console.log("[Add Price Data] ::>", dataToInsert.length, "items to insert");

    // Insert all new prices data
    const addData = await historyPricesCol.insertMany(dataToInsert);
    if (!addData.acknowledged) {
      console.error("[Add Price Data] Failed to add data ::>", dataToInsert);
      return {
        success: false,
        message: "Failed to add data",
      };
    }

    // Update latest config
    if (
      (latestDataDate ?? "") > ((latestConfig?.latestDataDate as string) ?? "")
    ) {
      const updateCol = await configsCollection.updateOne(
        { configId: 0 },
        {
          $set: { latestDataDate: latestDataDate },
          $setOnInsert: {
            configId: 0,
          },
        },
        {
          upsert: true,
        },
      );
      if (!updateCol.acknowledged) {
        console.error(
          "[Add Price Data] Failed to update latest config ::>",
          latestDataDate,
        );
        return {
          success: false,
          message: "Failed to update latest config",
        };
      }
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error("Error updating latest prices:", err);
    return {
      success: false,
      message: "Failed to update latest prices :> " + err,
    };
  }
};
