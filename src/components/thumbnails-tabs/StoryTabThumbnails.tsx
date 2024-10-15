import ThreeColumnsGrid from "@/components/misc/ThreeColumnsGrid";
import React from "react";
import { forwardRef } from "react";

interface Props {
  index: number;
  thumbnails: React.ReactElement[];
}

const StoryTabThumbnails = forwardRef<HTMLDivElement, Props>(({index, thumbnails}: Props, ref) => {
  return (
    <div ref={ref} data-index={index} className="min-w-full"> 
      <ThreeColumnsGrid>
        {
          thumbnails.map((thumbnail, index) => React.cloneElement(thumbnail, {key: index, alt: thumbnail.props.alt}))
        }
      </ThreeColumnsGrid>
    </div>
  );
});

StoryTabThumbnails.displayName = "Content tab";
export default StoryTabThumbnails;