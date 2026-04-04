export function SectionHeader({
  label,
  title,
  sub,
  action,
}: {
  label: string;
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 18,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              width: 16,
              height: 2,
              display: "inline-block",
            }}
          />
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-playfair, serif)",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        {sub && (
          <div style={{ fontSize: 11, opacity: 0.55, marginTop: 3 }}>{sub}</div>
        )}
      </div>
      {action}
    </div>
  );
}
