import { getTradingCenters } from "@/lib/db-queries/trading-centers";
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

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <CardTitle>Vegetables Management</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent></CardContent>
      </Card>
    </div>
  );
}
