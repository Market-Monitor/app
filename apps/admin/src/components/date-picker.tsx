"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@mm-app/ui/components/button";
import { Calendar } from "@mm-app/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@mm-app/ui/components/popover";
import { cn } from "@mm-app/ui/lib/utils";

export function DatePicker(props: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  const { date, setDate } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
