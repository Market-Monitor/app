"use client";

import LogoPNG from "@/assets/logo.png";
import { useAppData } from "@/providers/app-provider";
import { cn } from "@mm-app/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function AppLogo(props: {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}) {
  const { tradingCenter } = useAppData();

  return (
    <div className={cn("flex items-center justify-center", props.className)}>
      <Link href={`/${tradingCenter}`} className="flex items-center space-x-1">
        <Image
          src={LogoPNG}
          className={cn("w-24 h-24", props.imageClassName)}
          alt="AgriTrakPH Logo"
        />

        <h1
          className={cn(
            "font-black text-xl dark:text-gray-200 leading-none mt-2 tracking-wide uppercase",
            props.textClassName,
          )}
        >
          <span className="text-primary">Agri</span>TrakPH
        </h1>
      </Link>
    </div>
  );
}
