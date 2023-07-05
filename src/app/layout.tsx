import { Inter } from "next/font/google";

import InteractionDetector from "@/components/interactionDetector.js";
import { Overlay, StackAnimation } from "@/components/overlay";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mony Nethala",
  description: "Budding full stack developer",
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
          <Overlay>
            <StackAnimation>
              <div id="app">{children}</div>
            </StackAnimation>
            {/* <Portal pathname="/images">
           
            <Gallery />
          </Portal> */}
          </Overlay>
        </InteractionDetector>
      </body>
    </html>
  );
}
