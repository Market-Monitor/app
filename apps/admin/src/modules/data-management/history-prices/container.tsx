"use client";

import { Card, CardContent } from "@mm-app/ui/components/card";
import { useDataManagement } from "../dt-provider";
import { useHistoryDataActions } from "./actions-provider";
import { historyPricesDTColumns } from "./columns";
import HistoricalPricesTable from "./table";

export default function HistoryPricesContainer() {
  const { tradingCenter } = useDataManagement();
  const { allHistoryPrices } = useHistoryDataActions();

  return (
    <Card>
      <CardContent>
        <HistoricalPricesTable
          data={
            allHistoryPrices.find(
              (item) => item.tradingCenter === tradingCenter,
            )?.data ?? []
          }
          columns={historyPricesDTColumns}
        />
      </CardContent>
    </Card>
  );
}
