"use client";

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
import TradingCentersActionsProvider from "./context";
import TradingCenterTableActions from "./table-actions";

export default function DataTradingCentersTable(props: {
  data: WithId<TradingCenterDoc>[];
}) {
  return (
    <TradingCentersActionsProvider allTradingCenters={props.data}>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Long Name</TableHead>
              <TableHead>FB Page</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data.map((item) => (
              <TableRow key={item._id} className="">
                <TableCell className="py-6">{item._id}</TableCell>
                <TableCell className="py-6">{item.name}</TableCell>
                <TableCell className="py-6">{item.longName}</TableCell>
                <TableCell className="py-6">
                  {item.facebookPage ?? "-"}
                </TableCell>
                <TableCell className="py-6">{item.slug}</TableCell>
                <TableCell className="py-6">
                  <TradingCenterTableActions item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TradingCentersActionsProvider>
  );
}
