import { Search, Users } from "lucide-react";
import { useState } from "react";

import { useStore } from "../context/StoreContext";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

export default function Customers() {
  const { customers } = useStore();

  const [search, setSearch] =
    useState("");

  const filtered = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage your customer relationships."
      />

      <div className="filter-toolbar">
        <div className="search-box">
          <Search size={17} />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search customers..."
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="dashboard-card">
          <EmptyState
            title="No customers found"
            description="Try another search."
          />
        </div>
      ) : (
        <div className="customer-grid">
          {filtered.map((customer) => (
            <div
              className="customer-card"
              key={customer.id}
            >
              <div className="customer-avatar">
                {customer.name
                  .split(" ")
                  .map((part) =>
                    part[0]
                  )
                  .join("")}
              </div>

              <div className="customer-info">
                <h3>{customer.name}</h3>

                <p>{customer.email}</p>

                <div className="customer-stats">
                  <span>
                    <Users size={14} />
                    {customer.orders} orders
                  </span>

                  <strong>
                    $
                    {customer.spent.toFixed(
                      2
                    )}
                  </strong>
                </div>

                <StatusBadge
                  status={customer.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}