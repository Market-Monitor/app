import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@mm-app/ui/components/sidebar";

export default function AdminDashboardLayout(props: LayoutProps<"/dashboard">) {
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
