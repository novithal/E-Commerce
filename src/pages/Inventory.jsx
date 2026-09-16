import {
  AlertTriangle,
  CheckCircle2,
  Package
} from "lucide-react";

import { useStore } from "../context/StoreContext";
import PageHeader from "../components/PageHeader";

export default function Inventory() {
  const { products, categories } =
    useStore();

  const lowStock = products.filter(
    (product) => product.stock < 20
  );

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Monitor stock levels and inventory health."
      />

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">
              <Package size={21} />
            </div>
          </div>

          <div className="stat-content">
            <span>Total Products</span>
            <strong>
              {products.length}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon warning">
              <AlertTriangle size={21} />
            </div>
          </div>

          <div className="stat-content">
            <span>Low Stock</span>
            <strong>
              {lowStock.length}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon success">
              <CheckCircle2 size={21} />
            </div>
          </div>

          <div className="stat-content">
            <span>Healthy Stock</span>
            <strong>
              {products.length -
                lowStock.length}
            </strong>
          </div>
        </div>
      </div>

      <div className="inventory-grid">
        {products.map((product) => {
          const category =
            categories.find(
              (item) =>
                item.id ===
                product.categoryId
            );

          const low =
            product.stock < 20;

          return (
            <div
              className="inventory-card"
              key={product.id}
            >
              <div className="inventory-top">
                <div className="inventory-icon">
                  <Package size={21} />
                </div>

                {low && (
                  <span className="low-stock-label">
                    Low Stock
                  </span>
                )}
              </div>

              <h3>{product.name}</h3>

              <span className="muted">
                {category?.name}
              </span>

              <div className="inventory-stock">
                <span>Available Stock</span>
                <strong
                  className={
                    low
                      ? "stock-low"
                      : "stock-ok"
                  }
                >
                  {product.stock}
                </strong>
              </div>

              <div className="stock-progress">
                <div
                  style={{
                    width: `${Math.min(
                      product.stock,
                      100
                    )}%`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}