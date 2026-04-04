/*
 * just a <button> element
 * */
export function Btn({
  sm,
  onClick,
  className,
  style,
  children,
}: {
  sm?: boolean;
  onClick?: () => void;
  className: string;
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
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
        ...style,
      }}
      className={className}
    >
      {children}
    </button>
  );
}
