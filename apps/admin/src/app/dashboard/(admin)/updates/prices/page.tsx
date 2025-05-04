import { getTradingCenters } from "@/lib/db-queries/trading-centers";
import PriceUpdatesLatest from "@/modules/price-updates/latest-prices";
import PriceUpdatesVegetableCategories from "@/modules/price-updates/vegetable-categories";
import PriceUpdatesVegetables from "@/modules/price-updates/vegetables";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mm-app/ui/components/tabs";

export default async function AdminPricesPage() {
  const tradingCenters = await getTradingCenters();
  if (!tradingCenters) return null;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Update Latest Prices</CardTitle>
          <CardDescription>
            Add and import new latest vegetable prices, data and new sub
            categories / classes.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs defaultValue="latest-prices" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger className="cursor-pointer" value="latest-prices">
                Latest Prices
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="vegetables">
                Vegetables
              </TabsTrigger>
              <TabsTrigger
                className="cursor-pointer"
                value="vegetable-categories"
              >
                Vegetable Categories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="latest-prices">
              <PriceUpdatesLatest tradingCenters={tradingCenters.data || []} />
            </TabsContent>
            <TabsContent value="vegetables">
              <PriceUpdatesVegetables
                tradingCenters={tradingCenters.data || []}
              />
            </TabsContent>
            <TabsContent value="vegetable-categories">
              <PriceUpdatesVegetableCategories
                tradingCenters={tradingCenters.data || []}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
