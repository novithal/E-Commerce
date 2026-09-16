export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={21} />
        </div>

        <span
          className={`stat-change ${
            positive ? "positive" : "negative"
          }`}
        >
          {change}
        </span>
      </div>

      <div className="stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}