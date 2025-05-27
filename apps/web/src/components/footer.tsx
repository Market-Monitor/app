import ThemeSelection from "@mm-app/ui/components/theme-selection";
import { MailIcon } from "lucide-react";
import AppLogo from "./app-logo";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-between w-11/12 lg:w-5/6 mx-auto py-12">
      <div className="space-y-2">
        <AppLogo imageClassName="w-12 h-12" textClassName="text-sm mt-1" />

        <div className="space-y-2 ml-2">
          <p className="text-sm text-muted-foreground underline">
            Trading Centers
          </p>

          <ul className="text-muted-foreground font-medium">
            <li className="">
              <a
                className="text-sm text-muted-foreground hover:underline"
                href="https://www.facebook.com/baptc.price"
                target="_blank"
                rel="noopener noreferrer"
              >
                BAPTC
              </a>
            </li>
            <li className="">
              <a
                className="text-sm text-muted-foreground hover:underline"
                href="https://www.facebook.com/NVATerminal/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NVAT
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          <span>TBDH.DEV</span> | &copy; {new Date().getFullYear()}
        </p>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground underline">Other Links</p>

          <ul className="">
            <li className="">
              <a
                className="text-sm text-muted-foreground hover:underline"
                href="https://github.com/Market-Monitor/veggies-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                Service API
              </a>
            </li>
            <li className="">
              <a
                className="text-sm text-muted-foreground hover:underline"
                href="https://github.com/Market-Monitor/app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github Project
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <ThemeSelection />

        <div>
          <ul>
            <li>
              <a
                className="text-muted-foreground text-sm hover:underline inline-flex items-center space-x-2"
                href="mailto:joshue@tbdh.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MailIcon className="size-4" />{" "}
                <span>Contact | Report Issues</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
