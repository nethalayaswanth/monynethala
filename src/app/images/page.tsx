import Gallery from "@/screens/gallery";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export type ImageData ={

}
async function getImages() {
  try {
   const response = await getDocs(collection(db, "images")).then((res) => {
     const data = [] as any[] ;
     res.forEach((doc) => {
       data.push(doc.data() as any) 
     });

     return data;
   });

   return response;
  } catch (error) {
    throw error;
  }
}
export default async function Page() {

    const images = await getImages();
  return (
    <>
      <Gallery images={images} />
    </>
  );
}
 