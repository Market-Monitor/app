import { sidebarMenu } from "@/lib/menu";
import AppSidebarFooter from "@/modules/sidebar/footer";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@mm-app/ui/components/sidebar";
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

      <AppSidebarFooter />
    </Sidebar>
  );
}
