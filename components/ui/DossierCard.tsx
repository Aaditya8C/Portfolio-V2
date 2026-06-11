import React from "react";
import clsx from "clsx";

interface DossierCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function DossierCard({ children, className, ...props }: DossierCardProps) {
  return (
    <div
      className={clsx(
        "dossier-card bg-surface p-6 transition-all duration-300 hover:border-border-sharp",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
