import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              <section className="flex flex-col items-center justify-center gap-12">
                <Suspense fallback={<Spinner color="current" />}>
                  {children}
                </Suspense>
              </section>
            </main>
            <footer className="w-full flex items-center justify-center py-3 mt-18">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href={siteConfig.links.personal_github}
                title="alextmacri GitHub"
              >
                <span className="text-default-600">Created by</span>
                <p className="text-primary">alextmacri</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
