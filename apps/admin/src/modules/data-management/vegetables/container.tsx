"use client";

import { Card, CardContent } from "@mm-app/ui/components/card";
import { useDataManagement } from "../dt-provider";
import { useVeggieActions } from "./actions-provider";
import { veggiesDTColumns } from "./columns";
import VeggiesDataTable from "./table";

export default function DataVeggiesContainer() {
  const { tradingCenter } = useDataManagement();
  const { allVeggies } = useVeggieActions();

  return (
    <Card>
      <CardContent>
        <VeggiesDataTable
          data={
            allVeggies.find((item) => item.tradingCenter === tradingCenter)
              ?.data ?? []
          }
          columns={veggiesDTColumns}
        />
      </CardContent>
    </Card>
  );
}
