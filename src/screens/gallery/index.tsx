import Grid from "@/components/Grid";
import { getcolor } from "@/utils";
import Image from "next/image";
import Button from "@/components/button";
import HorizontalNavBar from "@/components/navbar/horizontalNavbar";

import Link from "next/link";
// import { IoMdCloseCircle as Close } from "react-icons/io";

 function Gallery({ images }: { images: any[] }) {
  return (
    <>
      <HorizontalNavBar>
        <Link href="/">
          <Button>{/* <Close size={30}/> */}</Button>
        </Link>
      </HorizontalNavBar>

      {images && images.length!==0 ? (
        <Grid>
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="w-full h-auto relative  "
                style={{ backgroundColor: getcolor()}}
              >
                <Image
                  key={`${index}`}
                  
                  width={image.width}
                  height={image.height}
                  src={image.url}
                  className={`w-full h-auto bg-cover bg-center will-change-transform`}
                  alt={" "}
                  
                ></Image>
              </div>
            );
          })}
        </Grid>
      ) : null}
    </>
  );
}

export default Gallery;
