import {
  CheckCircle2,
  Clock3,
  AlertCircle,
  XCircle,
  Package,
  Truck,
} from "lucide-react";

const statusConfig = {
  completed: {
    label: "Completed",
    className: "status-completed",
    icon: CheckCircle2,
  },
  processing: {
    label: "Processing",
    className: "status-processing",
    icon: Clock3,
  },
  pending: {
    label: "Pending",
    className: "status-pending",
    icon: Clock3,
  },
  cancelled: {
    label: "Cancelled",
    className: "status-cancelled",
    icon: XCircle,
  },
  canceled: {
    label: "Cancelled",
    className: "status-cancelled",
    icon: XCircle,
  },
  delivered: {
    label: "Delivered",
    className: "status-completed",
    icon: CheckCircle2,
  },
  shipped: {
    label: "Shipped",
    className: "status-shipped",
    icon: Truck,
  },
  in_stock: {
    label: "In Stock",
    className: "status-completed",
    icon: Package,
  },
  low_stock: {
    label: "Low Stock",
    className: "status-pending",
    icon: AlertCircle,
  },
  out_of_stock: {
    label: "Out of Stock",
    className: "status-cancelled",
    icon: XCircle,
  },
};

export default function StatusBadge({ status = "Pending" }) {
  const safeStatus = String(status || "Pending")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  const config = statusConfig[safeStatus] || {
    label: status || "Pending",
    className: "status-default",
    icon: Clock3,
  };

  const Icon = config.icon;

  return (
    <span className={`status-badge ${config.className}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
}