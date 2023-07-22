import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
 

import InteractionDetector from "@/components/interactionDetector.js";
import "../globals.css";
import ScreenDecider from "@/components/screens/screenDecider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mony Nethala",
  description: "full stack developer",
};

export default function RootLayout({
  children,
  mobile,
  
}: {
  children: React.ReactNode;
  mobile: React.ReactNode;
  desktop?: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={`${inter.className} font-inter`}>
        <InteractionDetector>
          {/* <Overlay> */}
          {/* <StackAnimation></StackAnimation> */}
          {/* <Portal pathname="/images">
           
            <Gallery />
          </Portal> */}
          {/* </Overlay> */}

          <div id="app">
            <ScreenDecider mobile={mobile} desktop={children} />
            {/* {children} */}
          </div>
        </InteractionDetector>
        <Analytics />
      </body>
    </html>
  );
}
