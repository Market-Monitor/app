import { TradingCenter } from "@/types/dt";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mm-app/ui/components/table";
import { WithId } from "mongodb";

export default function DataTradingCentersTable(props: {
  data: WithId<TradingCenter>[];
}) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Long Name</TableHead>
            <TableHead>Slug</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((item) => (
            <TableRow key={item._id.toString()} className="">
              <TableCell className="py-6">{item._id.toString()}</TableCell>
              <TableCell className="py-6">{item.name}</TableCell>
              <TableCell className="py-6">{item.longName}</TableCell>
              <TableCell className="py-6">{item.slug}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
