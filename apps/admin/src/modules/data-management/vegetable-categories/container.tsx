"use client";

import { Card, CardContent } from "@mm-app/ui/components/card";
import { useDataManagement } from "../dt-provider";
import { useVeggieCategoryActions } from "./actions-provider";
import { veggiesDTColumns } from "./columns";
import VeggiesCategoriesDataTable from "./table";

export default function VeggiesCategoriesContainer() {
  const { tradingCenter } = useDataManagement();
  const { allVeggieCategories } = useVeggieCategoryActions();

  return (
    <Card>
      <CardContent>
        <VeggiesCategoriesDataTable
          data={
            allVeggieCategories.find(
              (item) => item.tradingCenter === tradingCenter,
            )?.data ?? []
          }
          columns={veggiesDTColumns}
        />
      </CardContent>
    </Card>
  );
}
