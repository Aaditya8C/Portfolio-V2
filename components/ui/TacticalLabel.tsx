import React from "react";

interface TacticalLabelProps {
  children: React.ReactNode;
}

export default function TacticalLabel({ children }: TacticalLabelProps) {
  return (
    <div className="inline-flex items-center pl-2 border-l border-red-raw font-tactical text-[10px] tracking-wider text-accent uppercase">
      [ {children} ]
    </div>
  );
}
