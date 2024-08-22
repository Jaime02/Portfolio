import { forwardRef } from "react";

interface Props {
  index: number;
}

const OthersTab = forwardRef<HTMLDivElement, Props>(({index}: Props, ref) => {
  return (
    <div ref={ref} data-index={index} className="min-w-full snap-center">
      <p>Others</p>
    </div>
  );
});

export default OthersTab;