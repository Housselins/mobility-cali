import "reflect-metadata";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { NavBar } from "@/presentation/components/molecules";
import { MENU_DATA } from "@/lib/config/menuData";
import { StoreProvider } from "@/presentation";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="es">
      <body className={"w-screen h-screen " + inter.className}>
        <div className="h-[calc(100%)]">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
