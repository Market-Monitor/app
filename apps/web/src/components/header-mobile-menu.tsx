"use client";

import SearchBar from "@/modules/search/search-bar";
import TradingCenterSelections from "@/modules/trading-centers/selection";
import { TradingCenter } from "@mm-app/internal/api";
import { Button } from "@mm-app/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@mm-app/ui/components/sheet";
import { cn } from "@mm-app/ui/lib/utils";
import { MenuSquareIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HeaderMobileMenu(props: {
  className?: string;
  tradingCenters: TradingCenter[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className={cn("", props.className)}>
        <Button>
          <MenuSquareIcon className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="text-left space-y-0">
          <SheetTitle className="text-base">Main Menu</SheetTitle>
          <SheetDescription className="text-xs">Mobile Menu</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col space-y-4 mt-8">
          <ul className="w-full">
            <li className="w-full">
              <Link
                className="text-sm font-medium text-muted-foreground hover:text-primary duration-300 text-nowrap w-full"
                href="/vegetables-list"
                onClick={() => setIsOpen(false)}
              >
                Vegetables List
              </Link>
            </li>
          </ul>

          <SearchBar onSelectAction={() => setIsOpen(false)} />

          <TradingCenterSelections
            tradingCenters={props.tradingCenters}
            className="w-full"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
