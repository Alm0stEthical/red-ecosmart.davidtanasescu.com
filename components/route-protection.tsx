"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const routes = ["/", "/puzzel", "/code"];

export function RouteProtection({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAccess = () => {
      const currentIndex = routes.indexOf(pathname);
      if (currentIndex === -1) return;

      if (currentIndex > 0) {
        if (pathname === "/puzzel") {
          const startTime = localStorage.getItem("startTime");
          if (!startTime) {
            router.replace("/");
            return;
          }
        }

        if (pathname === "/code") {
          const collectedDigits = localStorage.getItem("collectedDigits");
          const digits = collectedDigits ? JSON.parse(collectedDigits) : [];
          if (digits.length < 3) {
            router.replace("/puzzel");
            return;
          }
        }
      }
    };

    checkAccess();
  }, [pathname, router]);

  return <>{children}</>;
}
