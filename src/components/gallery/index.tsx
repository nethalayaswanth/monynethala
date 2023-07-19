import Grid from "@/components/Grid";
import { getcolor } from "@/utils";
import Image from "next/image";

function Gallery({ images }: { images: any[] }) {
  return (
    <>
      {images && images.length !== 0 ? (
        <Grid>
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="w-full h-auto relative  "
                style={{ backgroundColor: getcolor() }}
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
