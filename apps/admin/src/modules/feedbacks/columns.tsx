"use client";

import { Feedback } from "@/lib/feedbacks/query";
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
import { useFeedbackActions } from "./actions-provider";

export const feedbackColumns: ColumnDef<Feedback>[] = [
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
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fullname
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "feedback",
    header: "Feedback",
    cell: ({ row }) => {
      return (
        <span className="w-[300px] truncate block">
          {row.getValue("feedback")}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <span>
          {new Date(row.getValue("createdAt")).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: function ActionsCell({ row }) {
      const { setAction } = useFeedbackActions();

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
                  feedback: row.original,
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
