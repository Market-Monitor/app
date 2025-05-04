import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@mm-app/ui/components/sidebar";
import { ReactNode } from "react";

export default function AdminDashboardLayout(props: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="p-2 w-full">
        <AppHeader />

        <div className="py-3">{props.children}</div>
      </main>
    </SidebarProvider>
  );
}
