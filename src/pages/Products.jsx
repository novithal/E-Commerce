import { useMemo, useState } from "react";

import {
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  X
} from "lucide-react";

import { useStore } from "../context/StoreContext";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

export default function Products({
  showToast
}) {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct
  } = useStore();

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [sort, setSort] =
    useState("newest");

  const [page, setPage] =
    useState(1);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [viewProduct, setViewProduct] =
    useState(null);

  const [editProduct, setEditProduct] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    categoryId: 1,
    sku: "",
    price: "",
    stock: ""
  });

  const pageSize = 6;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query =
        search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.sku
            .toLowerCase()
            .includes(query)
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter(
        (product) =>
          product.categoryId ===
          Number(categoryFilter)
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "stock-low") {
      result.sort(
        (a, b) => a.stock - b.stock
      );
    }

    if (sort === "sales") {
      result.sort(
        (a, b) => b.sales - a.sales
      );
    }

    return result;
  }, [
    products,
    search,
    categoryFilter,
    sort
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        pageSize
    )
  );

  const visibleProducts =
    filteredProducts.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  const openAdd = () => {
    setEditProduct(null);

    setForm({
      name: "",
      categoryId:
        categories[0]?.id || 1,
      sku: "",
      price: "",
      stock: ""
    });

    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);

    setForm({
      name: product.name,
      categoryId: product.categoryId,
      sku: product.sku,
      price: product.price,
      stock: product.stock
    });

    setModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      showToast?.(
        "Product name is required.",
        "error"
      );
      return;
    }

    if (!form.sku.trim()) {
      showToast?.(
        "SKU is required.",
        "error"
      );
      return;
    }

    if (
      form.price === "" ||
      Number(form.price) < 0
    ) {
      showToast?.(
        "Enter a valid price.",
        "error"
      );
      return;
    }

    if (
      form.stock === "" ||
      Number(form.stock) < 0
    ) {
      showToast?.(
        "Enter a valid stock.",
        "error"
      );
      return;
    }

    const data = {
      name: form.name.trim(),
      categoryId: Number(
        form.categoryId
      ),
      sku: form.sku.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      status: "Active",
      sales: editProduct
        ? editProduct.sales
        : 0,
      image:
        editProduct?.image ||
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    };

    if (editProduct) {
      updateProduct(
        editProduct.id,
        data
      );

      showToast?.(
        "Product updated successfully."
      );
    } else {
      addProduct(data);

      showToast?.(
        "Product added successfully."
      );
    }

    setModalOpen(false);
  };

  const handleDelete = (product) => {
    const confirmed =
      window.confirm(
        `Delete ${product.name}?`
      );

    if (!confirmed) {
      return;
    }

    deleteProduct(product.id);

    showToast?.(
      "Product deleted.",
      "info"
    );
  };

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage your complete product catalog."
        action={
          <button
            type="button"
            className="btn btn-primary"
            onClick={openAdd}
          >
            <Plus size={18} />
            Add Product
          </button>
        }
      />

      <div className="filter-toolbar">
        <div className="search-box">
          <Search size={17} />

          <input
            value={search}
            onChange={(event) => {
              setSearch(
                event.target.value
              );
              setPage(1);
            }}
            placeholder="Search products..."
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
          value={categoryFilter}
          onChange={(event) => {
            setCategoryFilter(
              event.target.value
            );
            setPage(1);
          }}
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
        >
          <option value="newest">
            Newest
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="stock-low">
            Stock: Low to High
          </option>

          <option value="sales">
            Best Selling
          </option>
        </select>
      </div>

      {visibleProducts.length === 0 ? (
        <div className="dashboard-card">
          <EmptyState
            title="No products found"
            description="Try changing your search or filters."
          />
        </div>
      ) : (
        <>
          <div className="dashboard-card table-card">
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {visibleProducts.map(
                    (product) => {
                      const category =
                        categories.find(
                          (item) =>
                            item.id ===
                            product.categoryId
                        );

                      return (
                        <tr
                          key={product.id}
                        >
                          <td>
                            <div className="table-product">
                              <img
                                src={
                                  product.image
                                }
                                alt={
                                  product.name
                                }
                              />

                              <strong>
                                {
                                  product.name
                                }
                              </strong>
                            </div>
                          </td>

                          <td>
                            {
                              category?.name ||
                              "Uncategorized"
                            }
                          </td>

                          <td>
                            {product.sku}
                          </td>

                          <td>
                            <strong>
                              $
                              {product.price.toFixed(
                                2
                              )}
                            </strong>
                          </td>

                          <td>
                            <span
                              className={
                                product.stock <
                                20
                                  ? "stock-low"
                                  : "stock-ok"
                              }
                            >
                              {
                                product.stock
                              }
                            </span>
                          </td>

                          <td>
                            <StatusBadge
                              status={
                                product.status
                              }
                            />
                          </td>

                          <td>
                            <div className="action-buttons">
                              <button
                                type="button"
                                title="View"
                                onClick={() =>
                                  setViewProduct(
                                    product
                                  )
                                }
                              >
                                <Eye
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                title="Edit"
                                onClick={() =>
                                  openEdit(
                                    product
                                  )
                                }
                              >
                                <Pencil
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                title="Delete"
                                className="danger"
                                onClick={() =>
                                  handleDelete(
                                    product
                                  )
                                }
                              >
                                <Trash2
                                  size={16}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
      )}

      <Modal
        open={modalOpen}
        title={
          editProduct
            ? "Edit Product"
            : "Add Product"
        }
        onClose={() =>
          setModalOpen(false)
        }
      >
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            <div className="form-group">
              <label>
                Product Name *
              </label>

              <input
                value={form.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value
                  })
                }
                placeholder="Product name"
              />
            </div>

            <div className="form-group">
              <label>
                SKU *
              </label>

              <input
                value={form.sku}
                onChange={(event) =>
                  setForm({
                    ...form,
                    sku: event.target.value
                  })
                }
                placeholder="SKU-001"
              />
            </div>

            <div className="form-group">
              <label>
                Category *
              </label>

              <select
                value={form.categoryId}
                onChange={(event) =>
                  setForm({
                    ...form,
                    categoryId:
                      event.target.value
                  })
                }
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-group">
              <label>
                Price *
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) =>
                  setForm({
                    ...form,
                    price: event.target.value
                  })
                }
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>
                Stock *
              </label>

              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(event) =>
                  setForm({
                    ...form,
                    stock: event.target.value
                  })
                }
                placeholder="0"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                setModalOpen(false)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              {editProduct
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(viewProduct)}
        title="Product Details"
        onClose={() =>
          setViewProduct(null)
        }
      >
        {viewProduct && (
          <div className="product-detail">
            <img
              src={viewProduct.image}
              alt={viewProduct.name}
            />

            <div>
              <span>
                {viewProduct.sku}
              </span>

              <h2>
                {viewProduct.name}
              </h2>

              <p>
                Category:{" "}
                {
                  categories.find(
                    (item) =>
                      item.id ===
                      viewProduct.categoryId
                  )?.name
                }
              </p>

              <strong className="detail-price">
                $
                {viewProduct.price.toFixed(
                  2
                )}
              </strong>

              <p>
                Stock:{" "}
                {viewProduct.stock}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}