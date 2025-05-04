"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mm-app/ui/components/select";
import { useMounted } from "@mm-app/ui/hooks/use-mounted";
import { cn } from "@mm-app/ui/lib/utils";
import { useTheme } from "next-themes";

export default function ThemeSelection(props: { className?: string }) {
  const isMounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className={cn("w-[180px]", props.className)}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
