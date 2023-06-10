import { db ,storage} from "@/firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";
import Stack from "../stacks";
import GridWrapper from "../wrapper/gridWrapper";

const fillers = { mobile: 1, tablet: 9, desktop: 15 };

export type docData = {id:string; title: string; url: string };
export type Data = { [key: string]: docData };

const constructData = (
  doc: QueryDocumentSnapshot<DocumentData>,
  storage: FirebaseStorage
) =>
  new Promise<docData>(async (res, rej) => {
    try {
      const { title, url } = doc.data();
      const src = await getDownloadURL(ref(storage, url));
      res({ title, url: src,id:doc.id } as docData);
    } catch (e) {
      rej(e);
    }
  });

async function getData() {
  try {
   

    const response = await getDocs(collection(db, "landing"));

    const promises: Promise<docData>[] = [];

    response.forEach(async (doc) => {
      promises.push(constructData(doc, storage));
    });

    const data = await Promise.all(promises);
    return data;
  } catch (e) {
    console.log(e)
    // throw new Error(`${e}`);
  }
}

export default async function Landing() {
  const data = await getData();
  console.log(data)
  return (
    data ?<GridWrapper fillers={fillers} id='images'>
      <div
        style={{
          gridColumn: `2/7`,
          gridRow: `1/span 3`,
        }}
        className={` grid-card flex justify-stretch  text-noto text-base tracking-wide  `}
      >
        <Stack data={data} />
      </div>
    </GridWrapper>:null
  );
}
