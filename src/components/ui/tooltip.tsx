"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/misc/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = ({ children, ref, ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) => (
  <TooltipPrimitive.Trigger ref={ref} {...props} onMouseUp={(e) => e.stopPropagation()}>
    <div className="mr-1 flex flex-row gap-0.5">
      {children}
      <span className="relative h-4 w-4 rounded-full bg-black align-top text-white dark:bg-white dark:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 transform"
        >
          <path d="M12 9h.01" />
          <path d="M11 12h1v4h1" />
        </svg>
      </span>
    </div>
  </TooltipPrimitive.Trigger>
);

TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = ({
  className,
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md px-3 py-1.5",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
