

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
      className="flex flex-col items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <div>
        <span className="font-medium">something went wrong!</span>
      </div>
      <button className="mt-4 rounded-md px-2 py-1.5 bg-red-600 text-white" onClick={() => reset()}>Try again</button>
    </div>
  );
}