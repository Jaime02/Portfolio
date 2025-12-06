import React from "react";

interface StoryTabThumbnailsProps {
  index: number;
  thumbnails: React.ReactElement[];
  ref?: React.Ref<HTMLDivElement>;
}

function StoryTabThumbnails({ index, thumbnails, ref }: StoryTabThumbnailsProps) {
  return (
    <div
      ref={ref}
      data-index={index}
      className="absolute top-0 w-full min-w-full data-animate:transition-[left] data-animate:duration-700"
    >
      <div className="grid grid-cols-3 gap-2 rounded-md bg-gray-100 p-2 dark:bg-gray-800">
        {thumbnails.map((thumbnail, index) => React.cloneElement(thumbnail, { key: index }))}
      </div>
    </div>
  );
};

export default StoryTabThumbnails;
