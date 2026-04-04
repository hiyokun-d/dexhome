type BadgeColor = "green" | "gold" | "red" | "blue";

const colorMap: Record<BadgeColor, { background: string; color: string }> = {
  green: { background: "rgba(122,140,110,.15)", color: "#7A8C6E" },
  gold: { background: "rgba(201,150,42,.10)", color: "#C9962A" },
  red: { background: "rgba(196,87,42,.11)", color: "#C4572A" },
  blue: { background: "rgba(74,144,217,.1)", color: "#4A90D9" },
};

export function Badge({
  color,
  style,
  className,
  children,
}: {
  children: React.ReactNode;
  color?: BadgeColor;
  style?: React.CSSProperties;
  className?: string;
}) {
  const colorStyle = color ? colorMap[color] : {};
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
        ...colorStyle,
        ...style,
      }}
      className={className}
    >
      {children}
    </span>
  );
}
