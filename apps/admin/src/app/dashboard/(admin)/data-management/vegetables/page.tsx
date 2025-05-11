import { EmptyCard } from "@/components/empty-card";
import { getAssets } from "@/lib/db-queries/assets";
import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import { getAllVeggies } from "@/lib/db-queries/veggies";
import DataManagementProvider from "@/modules/data-management/dt-provider";
import TradingCenterSelection from "@/modules/data-management/trading-center-selection";
import VeggieActionsProvider from "@/modules/data-management/vegetables/actions-provider";
import DataVeggiesContainer from "@/modules/data-management/vegetables/container";
import { AssetDoc } from "@/types/dt";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default async function AdminVegetablesPage() {
  const tradingCenters = await getTradingCenters();
  if (!tradingCenters) {
    return null;
  }

  const allVeggies = await getAllVeggies();
  if (!allVeggies) {
    return (
      <EmptyCard
        title="No Veggies Found"
        description="No veggies found in all trading centers"
        className="w-full h-full"
      />
    );
  }

  const assets = await getAssets();
  if (!assets) {
    return (
      <EmptyCard
        title="No Assets Found"
        description="No assets found in main db"
        className="w-full h-full"
      />
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <CardTitle>Vegetables Management</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <DataManagementProvider tradingCenters={tradingCenters.data ?? []}>
          <CardContent className="space-y-6">
            <TradingCenterSelection />

            <VeggieActionsProvider
              allVeggies={allVeggies.data ?? []}
              assets={
                assets
                  ? (assets.data?.map((item) => ({
                      ...item,
                      _id: item._id.toString(),
                    })) as AssetDoc[])
                  : []
              }
            >
              <DataVeggiesContainer />
            </VeggieActionsProvider>
          </CardContent>
        </DataManagementProvider>
      </Card>
    </div>
  );
}
