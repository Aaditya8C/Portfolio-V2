import React from "react";
import clsx from "clsx";

interface RedactTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function RedactText({ children, className }: RedactTextProps) {
  return (
    <span
      className={clsx(
        "redact text-black select-none hover:select-text hover:text-primary transition-colors duration-300",
        className
      )}
    >
      {children}
    </span>
  );
}
