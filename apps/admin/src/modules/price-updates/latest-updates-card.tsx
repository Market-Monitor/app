import { GetTradingCenters } from "@/types/dt";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";

export default function LatestUpdatesCard(props: {
  tradingCenters: GetTradingCenters[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Data</CardTitle>
        <CardDescription>
          Latest updates on prices, vegetables, and categories for each trading
          center.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {props.tradingCenters.map((item) => (
            <Card key={item._id}>
              <CardHeader>
                <CardDescription className="dark:text-white">
                  {new Date(item.config.latestDataDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </CardDescription>
                <CardTitle className="text-muted-foreground">
                  {item.name} ({item.longName})
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
