import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import TrackingScripts from "@/components/tracking-scripts";
import "@mm-app/ui/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased w-screen overflow-x-hidden`}
      >
        <Providers>{children}</Providers>
      </body>

      <TrackingScripts />
    </html>
  );
}
