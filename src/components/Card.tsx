import { HTMLAttributes } from "react";

export function Card({
  style,
  className,
  children,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,.3)",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
