"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
   
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
     
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Danger alert!</span> Change a few things up
        and try submitting again.
      </div>
      <button className="bg-red-800 text-white">
        Try again
      </button>
    </div>
  );
}
