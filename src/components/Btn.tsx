type BtnVariant = "primary" | "gold" | "outline" | "dark" | "red" | "green";

const variantMap: Record<BtnVariant, React.CSSProperties> = {
  primary: { background: "#2C1810", color: "#fff", border: "none" },
  gold: { background: "#C9962A", color: "#fff", border: "none" },
  outline: {
    background: "transparent",
    border: "1.5px solid #E2D8C8",
    color: "#2C1810",
  },
  dark: {
    background: "#1E1E25",
    color: "rgba(240,237,232,.65)",
    border: "1px solid rgba(255,255,255,.1)",
  },
  red: {
    background: "rgba(196,87,42,.15)",
    color: "#C4572A",
    border: "1px solid rgba(196,87,42,.2)",
  },
  green: {
    background: "rgba(122,140,110,.15)",
    color: "#7A8C6E",
    border: "1px solid rgba(122,140,110,.2)",
  },
};

/*
 * just a <button> element
 * */
export function Btn({
  sm,
  onClick,
  className,
  style,
  variant,
  children,
  type = "button",
  disabled,
}: {
  sm?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: BtnVariant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const variantStyle = variant ? variantMap[variant] : {};
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: sm ? "5px 13px" : "8px 18px",
        borderRadius: 9,
        fontSize: sm ? 11 : 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all .2s",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        ...variantStyle,
        ...style,
      }}
      className={className}
    >
      {children}
    </button>
  );
}
