import { useMemo, useState } from "react";

import {
  Eye,
  Search,
  X
} from "lucide-react";

import { useStore } from "../context/StoreContext";
import StatusBadge from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";

export default function Orders() {
  const { orders } = useStore();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [selected, setSelected] =
    useState(null);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        !search ||
        order.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        order.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [orders, search, status]);

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and manage all customer orders."
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
            placeholder="Search order or customer..."
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
            >
              <X size={15} />
            </button>
          )}
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
        >
          <option value="all">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Processing">
            Processing
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Cancelled">
            Cancelled
          </option>
        </select>
      </div>

      <div className="dashboard-card table-card">
        {filtered.length === 0 ? (
          <EmptyState
            title="No orders found"
            description="Try changing your search or filter."
          />
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>
                        {order.id}
                      </strong>
                    </td>

                    <td>
                      <div>
                        <strong>
                          {order.customer}
                        </strong>
                        <small className="table-subtext">
                          {order.email}
                        </small>
                      </div>
                    </td>

                    <td>{order.date}</td>

                    <td>
                      <strong>
                        $
                        {order.amount.toFixed(
                          2
                        )}
                      </strong>
                    </td>

                    <td>
                      <StatusBadge
                        status={
                          order.status
                        }
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="table-icon-button"
                        onClick={() =>
                          setSelected(
                            order
                          )
                        }
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(selected)}
        title="Order Details"
        onClose={() =>
          setSelected(null)
        }
      >
        {selected && (
          <div className="order-detail">
            <div>
              <span>Order ID</span>
              <strong>
                {selected.id}
              </strong>
            </div>

            <div>
              <span>Customer</span>
              <strong>
                {selected.customer}
              </strong>
            </div>

            <div>
              <span>Email</span>
              <strong>
                {selected.email}
              </strong>
            </div>

            <div>
              <span>Date</span>
              <strong>
                {selected.date}
              </strong>
            </div>

            <div>
              <span>Amount</span>
              <strong>
                $
                {selected.amount.toFixed(
                  2
                )}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <StatusBadge
                status={selected.status}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}