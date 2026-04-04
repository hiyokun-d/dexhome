import { type HTMLAttributes } from "react";

export function Card({
  style,
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,.3)",
        ...style,
      }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}
