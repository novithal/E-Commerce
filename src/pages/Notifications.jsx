import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Package,
  ShoppingCart
} from "lucide-react";

import PageHeader from "../components/PageHeader";

const notifications = [
  {
    id: 1,
    title: "New order received",
    text: "Order #ORD-1048 has been placed successfully.",
    time: "5 minutes ago",
    icon: ShoppingCart,
    type: "order"
  },
  {
    id: 2,
    title: "Low stock alert",
    text: "Wireless Headphones have only 18 units left.",
    time: "18 minutes ago",
    icon: AlertTriangle,
    type: "warning"
  },
  {
    id: 3,
    title: "Payment completed",
    text: "Payment for order #ORD-1047 was received.",
    time: "42 minutes ago",
    icon: CheckCircle2,
    type: "success"
  },
  {
    id: 4,
    title: "Order delivered",
    text: "Order #ORD-1042 has been delivered.",
    time: "1 hour ago",
    icon: Package,
    type: "delivery"
  },
  {
    id: 5,
    title: "New customer",
    text: "A new customer registered on your store.",
    time: "2 hours ago",
    icon: Bell,
    type: "info"
  }
];

export default function Notifications() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Stay updated with your latest store activity."
      />

      <div className="notification-page">
        {notifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <div
              className="notification-page-item"
              key={notification.id}
            >
              <div
                className={`notification-page-icon ${notification.type}`}
              >
                <Icon size={20} />
              </div>

              <div className="notification-page-content">
                <div>
                  <h3>
                    {notification.title}
                  </h3>

                  <span>
                    {notification.time}
                  </span>
                </div>

                <p>
                  {notification.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}