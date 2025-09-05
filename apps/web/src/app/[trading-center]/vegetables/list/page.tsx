import { veggiesAPI } from "@/lib/veggies-api/client";
import VeggiesList from "@/modules/veggies-list/list";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Vegetables List",
  description: "Available vegetables with price data and more",
};

export default async function VeggiesListPage(
  props: PageProps<"/[trading-center]/vegetables/list">,
) {
  const params = await props.params;
  const tradingCenter = params["trading-center"];

  const veggiesList = await veggiesAPI.getListVegggies(tradingCenter);

  if (!veggiesList.success) {
    return notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-black">Vegetables List</CardTitle>
        <CardDescription>
          Available vegetables with price data and more
        </CardDescription>
      </CardHeader>

      <CardContent>
        <VeggiesList data={veggiesList.data} />
      </CardContent>

      <CardFooter>
        <p className="text-sm text-muted-foreground">
          * This list is based on the frequent post taken from the sources.
        </p>
      </CardFooter>
    </Card>
  );
}
