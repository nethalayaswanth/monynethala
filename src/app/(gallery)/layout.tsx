import { Inter } from "next/font/google";

import InteractionDetector from "@/components/interactionDetector.js";
import HorizontalNavBar from "@/components/navbar/horizontalNavbar";
import Link from "next/link";
import Close from "@/components/button/close";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mony(Images)",
  description: "full stack developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-inter`}>
        <InteractionDetector>
          <div id="app">
            <HorizontalNavBar>
              <Link href="/">
                <Close />
              </Link>
            </HorizontalNavBar>
            {children}
          </div>
        </InteractionDetector>
      </body>
    </html>
  );
}
