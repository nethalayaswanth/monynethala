import Gallery from "@/screens/gallery";

export default function Page() {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Gallery />
    </>
  );
}
 