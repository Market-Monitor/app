import { sidebarMenu } from "@/lib/menu";
import UserDropdown from "@/modules/sidebar/user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@mm-app/ui/components/sidebar";
import ThemeSelection from "@mm-app/ui/components/theme-selection";
import Link from "next/link";
import AppLogo from "./app-logo";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>

      <SidebarContent>
        {sidebarMenu.map((item) => (
          <SidebarGroup key={item.group}>
            <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.label}>
                    <SidebarMenuButton asChild>
                      <Link href={subItem.href}>
                        <subItem.icon />
                        {subItem.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="space-y-2">
        <UserDropdown />

        <ThemeSelection className="w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}
