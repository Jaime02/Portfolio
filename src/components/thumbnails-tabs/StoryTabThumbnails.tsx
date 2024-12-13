import React from "react";
import { forwardRef } from "react";

interface Props {
  index: number;
  thumbnails: React.ReactElement[];
}

const StoryTabThumbnails = forwardRef<HTMLDivElement, Props>(({index, thumbnails}: Props, ref) => {
  return (
    <div ref={ref} data-index={index} className="min-w-full w-full absolute top-0 data-[animate]:transition-[left] data-[animate]:duration-700"> 
      <div className="grid grid-cols-3 gap-2 rounded-md bg-gray-100 dark:bg-gray-800 p-2">
        {
          thumbnails.map((thumbnail, index) => React.cloneElement(thumbnail, {key: index}))
        }
      </div>
    </div>
  );
});

StoryTabThumbnails.displayName = "Content tab";
export default StoryTabThumbnails;