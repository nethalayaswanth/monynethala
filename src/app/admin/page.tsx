"use client";
import Badge from "@/components/badge";
import useImages from "@/hooks/useImages";
import { getcolor } from "@/utils";
import { useState } from "react";
export default function Home() {
  const [folder, setFolder] = useState("images");
  const uploadImages = useImages({ folder });
  return (
    <div
      className={`flex w-full justify-center flex-col items-center min-h-[80vh]`}
    >
      <div className="flex flex-row max-w-[420px] mx-auto items-start justify-start flex-wrap pt-1 pb-3">
        <div className="relative flex flex-row items-center">
          <input
            type="text"
            id="folder"
            className="block p-4 pl-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="folder name"
            required
            value={folder}
            onChange={(e) => {
              setFolder(e.target.value.trim());
            }}
          />
          <div className="absolute right-2.5 ">
            <Badge highlightcolor={getcolor()}>
              <label htmlFor="select" className="p-[8px] text-sm">
                upload
              </label>
            </Badge>
            <input
              type="file"
              // ref={inputRef}
              id="select"
              onChange={uploadImages}
              multiple
              accept="image/*,video/*"
              style={{
                visibility: "hidden",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
