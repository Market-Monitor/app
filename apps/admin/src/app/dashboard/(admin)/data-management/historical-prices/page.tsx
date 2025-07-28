import { EmptyCard } from "@/components/empty-card";
import { getAllHistoryPrices } from "@/lib/db-queries/history-prices";
import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import DataManagementProvider from "@/modules/data-management/dt-provider";
import HistoryActionsProvider from "@/modules/data-management/history-prices/actions-provider";
import HistoryPricesContainer from "@/modules/data-management/history-prices/container";
import TradingCenterSelection from "@/modules/data-management/trading-center-selection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default async function AdminHistoricalPricesPage() {
  const tradingCenters = await getTradingCenters();
  if (!tradingCenters.success) {
    return null;
  }

  const allHistoryPrices = await getAllHistoryPrices();
  if (!allHistoryPrices) {
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
        <CardHeader>
          <CardTitle>Historical Prices Management</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <DataManagementProvider tradingCenters={tradingCenters.data ?? []}>
          <CardContent className="space-y-6">
            <TradingCenterSelection />

            <HistoryActionsProvider
              allHistoryPrices={allHistoryPrices.data ?? []}
            >
              <HistoryPricesContainer />
            </HistoryActionsProvider>
          </CardContent>
        </DataManagementProvider>
      </Card>
    </div>
  );
}
