"use client";

import { allMenuRoutes } from "@/lib/menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@mm-app/ui/components/breadcrumb";
import { SidebarTrigger } from "@mm-app/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const pathname = usePathname();

  const currentRoute = allMenuRoutes.find((item) => item.href == pathname);

  return (
    <div className="flex items-center space-x-4 px-3 py-2 rounded-lg bg-secondary w-full">
      <SidebarTrigger
        className="hover:bg-primary"
        title="Show / Hide Sidebar"
      />

      {currentRoute ? (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{currentRoute.group}</BreadcrumbPage>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={currentRoute.href}>{currentRoute.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : null}
    </div>
  );
}
