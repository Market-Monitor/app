import { EmptyCard } from "@/components/empty-card";
import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getAllVeggieCategories } from "@/lib/db-queries/veggie-categories";
import DataManagementProvider from "@/modules/data-management/dt-provider";
import TradingCenterSelection from "@/modules/data-management/trading-center-selection";
import VeggieCategoriesActionsProvider from "@/modules/data-management/vegetable-categories/actions-provider";
import VeggiesCategoriesContainer from "@/modules/data-management/vegetable-categories/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default async function AdminVegetableCategoriesPage() {
  const tradingCenters = await getTradingCenters();
  if (!tradingCenters) {
    return null;
  }

  const allVeggieCategories = await getAllVeggieCategories();
  if (!allVeggieCategories) {
    return (
      <EmptyCard
        title="No Veggie Categories Found"
        description="No vegetable categories found in all trading centers"
        className="w-full h-full"
      />
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <CardTitle>Vegetable Categories (or Classes) Management</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <DataManagementProvider tradingCenters={tradingCenters.data ?? []}>
          <CardContent className="space-y-6">
            <TradingCenterSelection />

            <VeggieCategoriesActionsProvider
              allVeggieCategories={allVeggieCategories.data ?? []}
            >
              <VeggiesCategoriesContainer />
            </VeggieCategoriesActionsProvider>
          </CardContent>
        </DataManagementProvider>
      </Card>
    </div>
  );
}
