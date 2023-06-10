import NavBar from "@/components/navbar";
import { Inter } from "next/font/google";

import { Overlay, StackAnimation } from "@/components/overlay";
import Portal from "@/components/portal";
import Socials from "@/components/socials";
import Card from "@/components/card";
import { IoMdCloseCircle } from "react-icons/io";
import Gallery from "@/screens/gallery";
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
        <Overlay>
          <StackAnimation>
            <div id="app">
              {/* <NavBar>
                <Socials />
              </NavBar> */}
             
                {/* <motion.div
          // onClick={() => {
          //   dispatch({ type: "close" });
          // }}
          className=" m-0"
        > */}

                {/* <Card>
                  <IoMdCloseCircle size={20} />
                </Card> */}
                {/* </motion.div> */}
            
              {children}
            </div>
          </StackAnimation>
          <Portal pathname="/images">
            {/* @ts-expect-error Async Server Component */}
            <Gallery />
          </Portal>
        </Overlay>
      </body>
    </html>
  );
}
