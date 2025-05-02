"use client";

import { veggiesAPI } from "@/lib/veggies-api/client";
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
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

export default function SearchBarResults(props: {
  data: Awaited<ReturnType<typeof veggiesAPI.getVeggieClasses>>;
  onSelectAction?: () => void;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[200px] justify-start bg-card"
        >
          <SearchIcon className="size-4" />
          Search ...
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] md:w-[500px]" align="start">
        <Command>
          <CommandInput placeholder="Search for vegetables..." />

          <CommandList>
            {props.data.success ? (
              <Fragment>
                <CommandEmpty>No vegetables found.</CommandEmpty>
                <CommandGroup>
                  {props.data.data.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.name}
                      onSelect={() => {
                        router.push(`/prices/${item.parentId}/${item.id}`);
                        setOpen(false);

                        if (props.onSelectAction) {
                          props.onSelectAction();
                        }
                      }}
                      asChild
                    >
                      <Link
                        onClick={() => setOpen(false)}
                        href={`/prices/${item.parentId}/${item.id}`}
                      >
                        {item.name}
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Fragment>
            ) : (
              <CommandEmpty>
                There was a problem loading list of vegetables. Please try again
                later.
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
