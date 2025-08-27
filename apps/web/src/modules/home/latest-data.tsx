import PesoSign from "@/components/peso-sign";
import { LatestVeggiePrices, VeggieCategory } from "@mm-app/internal/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mm-app/ui/components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@mm-app/ui/components/tooltip";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function HomeLatestPricesData(props: {
  latestPrices: LatestVeggiePrices;
  category?: VeggieCategory;
  tradingCenter: string;
}) {
  return (
    <Card className="">
      {props.category ? (
        <CardHeader>
          <CardTitle>{props.category}</CardTitle>
        </CardHeader>
      ) : (
        <></>
      )}

      <CardContent>
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Vegetable</TableHead>

              <TableHead className="text-muted-foreground">
                <div>
                  Prices
                  <div>
                    <small>(Lowest - Highest)</small>
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {props.latestPrices.data.map((item) => (
              <Fragment key={item.parentId}>
                <TableRow>
                  <TableCell colSpan={2}>
                    <strong className="text-base">{item.parentName}</strong>
                  </TableCell>
                </TableRow>
                {item.classes.map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="pl-8">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/${props.tradingCenter}/prices/${item.parentId}/${cls.id}`}
                            className="space-x-2 hover:underline hover:text-primary text-base"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="inline-block">{cls.name}</span>

                            <ExternalLinkIcon className="size-2 inline-block" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>View more price details</TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <PesoSign />
                      {cls.price[0]} - <PesoSign />
                      {cls.price[1] ?? [cls.price[0]]}
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
