type BtnVariant = "primary" | "gold" | "outline";

const variantMap: Record<BtnVariant, React.CSSProperties> = {
  primary: { background: "#2C1810", color: "#fff", border: "none" },
  gold: { background: "#C9962A", color: "#fff", border: "none" },
  outline: {
    background: "transparent",
    border: "1.5px solid #E2D8C8",
    color: "#2C1810",
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
}: {
  sm?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  variant?: BtnVariant;
}) {
  const variantStyle = variant ? variantMap[variant] : {};
  return (
    <button
      type="button"
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
