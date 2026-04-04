export function Badge({
  style,
  className,
  children,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  className: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "3px 9px",
        borderRadius: 100,
        fontSize: 10,
        fontWeight: 700,
        ...style,
      }}
      className={className}
    >
      {children}
    </span>
  );
}
