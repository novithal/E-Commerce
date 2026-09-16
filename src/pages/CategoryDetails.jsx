import {
  ArrowLeft,
  Package,
  ShoppingBag
} from "lucide-react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useStore } from "../context/StoreContext";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";

export default function CategoryDetails() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    categories,
    products
  } = useStore();

  const category = categories.find(
    (item) =>
      item.id === Number(categoryId)
  );

  if (!category) {
    return (
      <div className="dashboard-card">
        <EmptyState
          title="Category not found"
          description="The category you are looking for does not exist."
        />

        <div className="center-action">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              navigate("/categories")
            }
          >
            <ArrowLeft size={17} />
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(
    (product) =>
      product.categoryId === category.id
  );

  return (
    <div>
      <button
        type="button"
        className="back-button"
        onClick={() =>
          navigate("/categories")
        }
      >
        <ArrowLeft size={17} />
        Back to Categories
      </button>

      <div className="category-detail-hero">
        <div
          className="category-detail-icon"
          style={{
            background: `${category.color}18`,
            color: category.color
          }}
        >
          <Package size={32} />
        </div>

        <div>
          <h2>{category.name}</h2>
          <p>{category.description}</p>

          <span className="category-count">
            {relatedProducts.length} related products
          </span>
        </div>
      </div>

      <PageHeader
        title={`Products in ${category.name}`}
        description={`Showing all products related to ${category.name}.`}
        action={
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              navigate("/products")
            }
          >
            <ShoppingBag size={17} />
            All Products
          </button>
        }
      />

      {relatedProducts.length === 0 ? (
        <div className="dashboard-card">
          <EmptyState
            title="No products in this category"
            description="Add products to this category and they will appear here."
          />
        </div>
      ) : (
        <div className="related-product-grid">
          {relatedProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="product-card-body">
                <span className="product-sku">
                  {product.sku}
                </span>

                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>
                    ${product.price.toFixed(2)}
                  </strong>

                  <span
                    className={
                      product.stock < 20
                        ? "stock-low"
                        : "stock-ok"
                    }
                  >
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}