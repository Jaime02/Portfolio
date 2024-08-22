import { forwardRef } from "react";

interface Props {}

const OthersTab = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  return (
    <div className="min-w-full snap-center">
      <p>Others</p>
    </div>
  );
});

export default OthersTab;