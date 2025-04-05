import { RouteProtection } from "@/components/route-protection";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoSmart Escape Room",
  description: "Red EcoSmart van het faillissement!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={monaSans.className}>
        <RouteProtection>{children}</RouteProtection>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
