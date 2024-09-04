import "reflect-metadata";
import type { Metadata } from "next";
import { ModuleNavBar, NavBar } from "@/presentation/components/molecules";
import { NEWS_MENU_DATA } from "@/lib/config/menuData";

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
    <div className="w-full h-full">
      <div className="w-full h-[calc(15%)]">
        <ModuleNavBar links={NEWS_MENU_DATA} />
      </div>
      <div className="w-full h-[calc(85%)]">{children}</div>
    </div>
  );
}
