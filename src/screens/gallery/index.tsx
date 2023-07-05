import Grid from "@/components/Grid";
import Card from "@/components/card";

import { getcolor } from "@/utils";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";

import { storage } from "@/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import NavBar from "@/components/navbar";
import Link from "next/link";
import Close from "@/components/button/close";

async function getImages() {
  const listRef = ref(storage, "images");

  try {
    const list = await listAll(listRef);
    return Promise.all(
      list.items.map((itemRef) => {
        return getDownloadURL(itemRef);
      })
    );
  } catch (error) {
    // Uh-oh, an error occurred!
    console.log(error);
  }
}
async function Gallery() {
  const images = await getImages();

  return (
    <>
      <NavBar absolute horizontal>
        <Link href="/">
          <Close />
        </Link>
      </NavBar>
     
        <Grid>
          {images &&
            images.map((image, index) => {
              return (
                <div
                  key={index}
                  className="w-full  relative  "
                  style={{ backgroundColor: getcolor(), height: "200px" }}
                >
                  <Image
                    key={`${index}`}
                    src={image}
                    className={`w-full h-auto bg-cover bg-center will-change-transform`}
                    alt={""}
                    fill={true}
                  ></Image>
                </div>
              );
            })}
        </Grid>
     
    </>
  );
}

export default Gallery;
