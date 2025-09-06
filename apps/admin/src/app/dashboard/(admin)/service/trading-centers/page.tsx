import { EmptyCard } from "@/components/empty-card";
import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import DataTradingCentersTable from "@/modules/dt/trading-centers/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default async function AdminTradingCentersPage() {
  const res = await getTradingCenters();

  if (!res.success) {
    return (
      <div>
        <EmptyCard
          title="Failed to fetch trading centers"
          description="An error occurred while fetching trading centers."
        />
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Trading Centers</CardTitle>
            <CardDescription>Manage available trading centers</CardDescription>
          </div>

          <div>{/* <AddNewTradingCenter /> */}</div>
        </CardHeader>

        <CardContent>
          <DataTradingCentersTable data={res.data ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
