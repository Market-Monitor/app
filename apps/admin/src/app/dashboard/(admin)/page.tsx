import { EmptyCard } from "@/components/empty-card";
import { getAppStats } from "@/lib/db-queries/app-stats";
import StatsTradeCenterSelection from "@/modules/dashboard/selection";
import StatsCards from "@/modules/dashboard/stats-card";
import AppStatsProvider from "@/modules/dashboard/stats-provider";
import { Button } from "@mm-app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default async function AdminPage() {
  const appStats = await getAppStats();
  if (!appStats.success) {
    return <EmptyCard title="Error" description="Failed to fetch app stats" />;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AgriTrakPH - Admin Dashboard</CardTitle>
        <CardDescription>
          This is the admin dashboard for the AgriTrakPH application. Here you
          can manage trading centers, assets, and other administrative tasks.
        </CardDescription>
      </CardHeader>

      <AppStatsProvider appStats={appStats.data!}>
        <CardContent className="space-y-12">
          <div className="space-y-8">
            <StatsTradeCenterSelection />

            <StatsCards />
          </div>

          <hr />

          <div className="grid grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardDescription>Trading Centers</CardDescription>
                <CardTitle className="text-4xl font-black">
                  {appStats.data?.tradingCenters.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <CardDescription>
                  Total number of trading centers in the system
                </CardDescription>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardDescription>Assets</CardDescription>
                <CardTitle className="text-4xl font-black">
                  {appStats.data?.assets}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <CardDescription>
                  Total number of assets uploaded to the system
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </AppStatsProvider>

      <CardFooter>
        <div>
          <Button asChild variant={"link"}>
            <a
              title="Go to Web App"
              href="https://marketmonitor.tbdh.dev/baptc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Web App
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
