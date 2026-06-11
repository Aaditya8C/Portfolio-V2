import React from "react";
import clsx from "clsx";

interface CaseNumberProps {
  num: string | number;
  className?: string;
}

export default function CaseNumber({ num, className }: CaseNumberProps) {
  const formatted = typeof num === "number" ? String(num).padStart(3, "0") : num;
  return (
    <span className={clsx("font-tactical text-[11px] text-ghost tracking-wider uppercase", className)}>
      CASE // {formatted}
    </span>
  );
}
