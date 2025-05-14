"use client";

import { VeggiePrice } from "@mm-app/internal/api";
import { Button } from "@mm-app/ui/components/button";
import { Checkbox } from "@mm-app/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@mm-app/ui/components/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, EditIcon, MoreHorizontalIcon } from "lucide-react";
import { useHistoryDataActions } from "./actions-provider";

export const historyPricesDTColumns: ColumnDef<VeggiePrice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "parentName",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Parent Name
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Prices",
  },
  {
    accessorKey: "dateUnix",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.dateUnix).toLocaleDateString("en-US"),
    filterFn: (row, columnId, filterValue) => {
      if (row.original.dateUnix === filterValue) {
        return true;
      }

      return false;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: function ActionsCell({ row }) {
      const { setAction } = useHistoryDataActions();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreHorizontalIcon />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => {
                setAction({
                  type: "edit",
                  isOpen: true,
                  veggiePrice: row.original,
                });
              }}
            >
              <EditIcon />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
