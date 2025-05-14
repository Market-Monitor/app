import { TradingCenterDoc } from "@/types/dt";
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
  data: WithId<TradingCenterDoc>[];
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
            <TableRow key={item._id} className="">
              <TableCell className="py-6">{item._id}</TableCell>
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
