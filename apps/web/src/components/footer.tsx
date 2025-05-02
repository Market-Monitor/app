import ThemeSelection from "@mm-app/ui/components/theme-selection";
import AppLogo from "./app-logo.js";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-between w-11/12 lg:w-5/6 mx-auto py-12">
      <AppLogo imageClassName="w-8 h-8" textClassName="text-sm mt-1" />

      <div>
        <p className="text-sm text-muted-foreground">
          <span>TBDH.DEV</span> | &copy; {new Date().getFullYear()}
        </p>
      </div>

      <div>
        <ThemeSelection />
      </div>
    </footer>
  );
}
