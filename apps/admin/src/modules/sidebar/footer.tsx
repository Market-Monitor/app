"use client";

import { SidebarFooter } from "@mm-app/ui/components/sidebar";
import ThemeSelection from "@mm-app/ui/components/theme-selection";
import { useHasMounted } from "@mm-app/ui/hooks/use-has-mounted";
import UserDropdown from "./user-menu";

export default function AppSidebarFooter() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <></>;
  }

  return (
    <SidebarFooter className="space-y-2">
      <UserDropdown />

      <ThemeSelection className="w-full" />
    </SidebarFooter>
  );
}
