"use client";

import LogoPNG from "@/assets/logo.png";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@mm-app/ui/components/sidebar";
import { cn } from "@mm-app/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function AppLogo(props: {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size={"lg"} className="h-[auto] py-4" asChild>
          <Link href={"/"}>
            <div
              className={cn(
                "flex items-center justify-center",
                props.className,
              )}
            >
              <Image
                src={LogoPNG}
                className={cn("size-20", props.imageClassName)}
                alt="AgriTrakPH Logo"
              />

              <h1
                className={cn(
                  "font-black text-lg dark:text-gray-200 leading-none text-center leading-normal",
                  props.textClassName,
                )}
              >
                <span className="text-primary">Agri</span>TrakPH <br />
                <span className="text-xs font-bold">ADMIN</span>
              </h1>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
