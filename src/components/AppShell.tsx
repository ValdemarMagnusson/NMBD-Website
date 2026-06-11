"use client";

import { usePathname } from "next/navigation";
import Footer from "./nmbd/Footer";
import InnerPageNav from "./nmbd/InnerPageNav";
import { usePageSeo } from "../hooks/usePageSeo";
import "@/styles/nmbd/app.css";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  usePageSeo();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="nmbd-app nmbd-inner">
      <InnerPageNav />
      <main className="inner-main">{children}</main>
      <Footer />
    </div>
  );
}
