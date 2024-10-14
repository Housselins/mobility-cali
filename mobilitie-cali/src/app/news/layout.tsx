import "reflect-metadata";
import type { Metadata } from "next";
import { ModuleNavBar, NavBar } from "@/presentation/components/molecules";
import { NEWS_MENU_DATA } from "@/lib/config/menuData";
import { Topbar } from "@/components/topbar/Topbar";

export const metadata: Metadata = {
  title: "Secretaria de movilidad",
  description: "Webapp gubernamental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full max-h-[calc(33.33px)]">
        <Topbar />
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
