"use client";

import { createImage } from "@/utils";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useCallback } from "react";
import { db, storage } from "../firebase";


const useImages = ({ folder = "images" }={}) => {
  const uploadImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Object.values(files).forEach((file) => {
      const root = ref(storage, folder);
      const uploadTask = uploadBytesResumable(ref(root, file.name), file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log("error:-", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            const createMeta = file.type.includes("image")
              ? createImage
              : null;

            if(!createMeta) return
            const tempUrl = URL.createObjectURL(file);

            const meta = await createMeta(tempUrl);

            URL.revokeObjectURL(tempUrl);
            addDoc(collection(db, folder), {
              name: file.name.toString(),
              url: downloadURL.toString(),
              ...meta,
            })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          });
        }
      );
    });
  }, [folder]);

  return uploadImages;
};

export default useImages;
