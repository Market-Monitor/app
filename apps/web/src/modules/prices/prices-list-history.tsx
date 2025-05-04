import PesoSign from "@/components/peso-sign";
import { VeggiePrice } from "@mm-app/internal/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";
import { ScrollArea } from "@mm-app/ui/components/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mm-app/ui/components/table";
import { format } from "date-fns";

export default function PricesListHistory(props: {
  pricesData: VeggiePrice[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History</CardTitle>
        <CardDescription>
          Historical prices for the selected vegetable
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px] rounded-md border pb-2">
          <Table className="table-fixed">
            <TableCaption>
              Incase of missing data on a date, it means that price may have not
              changed during that day.
            </TableCaption>
            <TableHeader className="text-center sticky top-0 bg-muted [&_tr]:border-b [&_tr]:border-b-border">
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Prices</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-center">
              {props.pricesData
                .sort((a, b) => b.dateUnix - a.dateUnix)
                .map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="py-4">
                      {format(new Date(item.dateUnix), "MMMM dd, yyyy")}
                    </TableCell>

                    <TableCell className="py-4">
                      <PesoSign />
                      {item.price[0]} - <PesoSign />
                      {item.price[1]}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
