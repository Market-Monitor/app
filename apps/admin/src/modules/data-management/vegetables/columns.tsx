"use client";

import { Veggie } from "@mm-app/internal/api";
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
import { useVeggieActions } from "./actions-provider";

export const veggiesDTColumns: ColumnDef<Veggie>[] = [
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
          Vegetable
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Image URL",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: function ActionsCell({ row }) {
      const { setAction } = useVeggieActions();

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
                  veggie: row.original,
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
