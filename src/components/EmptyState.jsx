import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  description = "There is nothing to display."
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <SearchX size={27} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}