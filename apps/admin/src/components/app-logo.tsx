"use client";

import LogoPNG from "@/assets/logo.png";
import { cn } from "@mm-app/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function AppLogo(props: {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center", props.className)}>
      <Link href="/" className="flex flex-col items-center justify-center">
        <Image
          src={LogoPNG}
          className={cn("w-24 h-24", props.imageClassName)}
          alt="AgriTrakPH Logo"
        />

        <h1
          className={cn(
            "font-black text-lg dark:text-gray-200 leading-none text-center leading-normal",
            props.textClassName,
          )}
        >
          <span className="text-primary">Agri</span>TrakPH <br />
          <strong>(ADMIN)</strong>
        </h1>
      </Link>
    </div>
  );
}
