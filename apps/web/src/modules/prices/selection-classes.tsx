"use client";

import { Button } from "@mm-app/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@mm-app/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@mm-app/ui/components/popover";
import { cn } from "@mm-app/ui/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectionClasses(props: {
  id: string;
  selections: {
    name: string;
    value: string;
    id: string;
  }[];
  currentSelection: string;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value] = useState(props.currentSelection);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full py-6 justify-between bg-background/30"
        >
          {value
            ? props.selections.find((item) => item.value === value)?.name
            : "Select class..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search class..." />
          <CommandList>
            <CommandEmpty>No class found.</CommandEmpty>
            <CommandGroup>
              {props.selections
                .sort((a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  }

                  if (a.name > b.name) {
                    return 1;
                  }

                  return 0;
                })
                .map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.value}
                    onSelect={() => {
                      router.push(`/prices/${props.id}/${item.id}`, {
                        scroll: false,
                      });
                    }}
                  >
                    {item.value === value ? (
                      <Check
                        className={cn(
                          "mr-2",
                          value === item.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    ) : (
                      <div className="size-4 mr-2"></div>
                    )}

                    {item.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
