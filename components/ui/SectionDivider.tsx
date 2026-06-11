import React from "react";
import clsx from "clsx";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className }: SectionDividerProps) {
  return (
    <hr className={clsx("border-0 h-[1px] bg-red-raw opacity-30 w-full", className)} />
  );
}
