"use client";

import { generateRandomHsv } from "@/utils";
import { motion, useIsPresent } from "framer-motion";

export default function Cover({ name }: { name: string }) {
  const isPresent = useIsPresent();
  const accent = generateRandomHsv();

  console.log(name, isPresent);
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 z-[1000] `}
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0, transition: { duration: 10, ease: "circOut" } }}
      exit={{ scaleX: 1, transition: { duration: 10, ease: "circIn" } }}
      style={{
        originX: isPresent ? 0 : 1,
        backgroundColor: accent,
      }}
    />
  );
}
