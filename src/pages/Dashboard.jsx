import {
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users
} from "lucide-react";

import { useStore } from "../context/StoreContext";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const {
    products,
    orders,
    customers
  } = useStore();

  const revenue = orders.reduce(
    (sum, order) => sum + order.amount,
    0
  );

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const lowStock = products.filter(
    (product) => product.stock < 20
  ).length;

  const chartData = [
    { month: "Mar", value: 58 },
    { month: "Apr", value: 72 },
    { month: "May", value: 62 },
    { month: "Jun", value: 82 },
    { month: "Jul", value: 76 },
    { month: "Aug", value: 92 },
    { month: "Sep", value: 88 }
  ];

  return (
    <div>
      <div className="dashboard-welcome">
        <div>
          <h2>Dashboard</h2>
          <p>
            Here's an overview of your e-commerce
            business today.
          </p>
        </div>

       
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Revenue"
          value={`$${revenue.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }
          )}`}
          change="+12.5%"
          icon={DollarSign}
        />

        <StatCard
          title="Total Orders"
          value={orders.length + 1043}
          change="+8.2%"
          icon={ShoppingCart}
        />

        <StatCard
          title="Total Products"
          value={products.length + 124}
          change="+4.8%"
          icon={Package}
        />

        <StatCard
          title="Customers"
          value={customers.length + 2458}
          change="+15.3%"
          icon={Users}
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <div className="card-header">
            <div>
              <h3>Revenue Overview</h3>
              <p>Monthly revenue performance</p>
            </div>

            <select defaultValue="7months">
              <option value="7months">
                Last 7 months
              </option>
              <option value="year">
                This year
              </option>
            </select>
          </div>

          <div className="chart">
            {chartData.map((item) => (
              <div
                className="chart-column"
                key={item.month}
              >
                <div className="chart-value">
                  ${item.value}k
                </div>

                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${item.value}%`
                    }}
                  />
                </div>

                <span>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Store Health</h3>
              <p>Current store status</p>
            </div>
          </div>

          <div className="health-list">
            <div>
              <span>Products</span>
              <strong>{products.length + 124}</strong>
            </div>

            <div>
              <span>Completed Orders</span>
              <strong>
                {completedOrders + 1038}
              </strong>
            </div>

            <div>
              <span>Low Stock Products</span>
              <strong className="warning-text">
                {lowStock}
              </strong>
            </div>

            <div>
              <span>Customers</span>
              <strong>
                {customers.length + 2458}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card table-card">
        <div className="card-header">
          <div>
            <h3>Recent Orders</h3>
            <p>Latest customer orders</p>
          </div>

          <button
            type="button"
            className="text-button"
            onClick={() =>
              (window.location.href = "/orders")
            }
          >
            View all
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>

                  <td>{order.customer}</td>

                  <td>{order.date}</td>

                  <td>
                    <strong>
                      ${order.amount.toFixed(2)}
                    </strong>
                  </td>

                  <td>
                    <StatusBadge
                      status={order.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}