import { useState } from "react";

import {
  ArrowRight,
  FolderPlus,
  Laptop,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  Trash2
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useStore } from "../context/StoreContext";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";

const iconMap = {
  Laptop,
  Shirt,
  Home,
  Sparkles,
  Dumbbell
};

export default function Categories({
  showToast
}) {
  const {
    categories,
    products,
    addCategory,
    deleteCategory
  } = useStore();

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "Laptop"
  });

  const [error, setError] = useState("");

  const getProductCount = (categoryId) => {
    return products.filter(
      (product) =>
        product.categoryId === categoryId
    ).length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      setError("Category name is required.");
      return;
    }

    const exists = categories.some(
      (category) =>
        category.name.toLowerCase() ===
        name.toLowerCase()
    );

    if (exists) {
      setError(
        "This category already exists."
      );
      return;
    }

    addCategory({
      name,
      description:
        form.description.trim() ||
        "New product category.",
      icon: form.icon,
      color: "#d93f68"
    });

    setForm({
      name: "",
      description: "",
      icon: "Laptop"
    });

    setError("");
    setModalOpen(false);

    showToast?.(
      `${name} category added successfully.`
    );
  };

  const handleDelete = (event, category) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${category.name}" category?`
    );

    if (!confirmed) {
      return;
    }

    deleteCategory(category.id);

    showToast?.(
      `${category.name} category deleted.`,
      "info"
    );
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Organize and manage your product categories."
        action={
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setError("");
              setModalOpen(true);
            }}
          >
            <FolderPlus size={18} />
            Add Category
          </button>
        }
      />

      <div className="category-info-banner">
        <div>
          <strong>
            {categories.length} Categories
          </strong>

          <span>
            Click any category to view its related
            products.
          </span>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => {
          const Icon =
            iconMap[category.icon] || Laptop;

          const count = getProductCount(
            category.id
          );

          return (
            <div
              className="category-card"
              key={category.id}
              onClick={() =>
                navigate(
                  `/categories/${category.id}`
                )
              }
            >
              <div
                className="category-icon"
                style={{
                  background: `${category.color}18`,
                  color: category.color
                }}
              >
                <Icon size={25} />
              </div>

              <div className="category-card-content">
                <h3>{category.name}</h3>

                <p>{category.description}</p>

                <div className="category-meta">
                  <span>
                    {count}{" "}
                    {count === 1
                      ? "Product"
                      : "Products"}
                  </span>

                  <ArrowRight size={17} />
                </div>
              </div>

              <button
                type="button"
                className="category-delete"
                title="Delete category"
                onClick={(event) =>
                  handleDelete(
                    event,
                    category
                  )
                }
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>

      <Modal
        open={modalOpen}
        title="Add New Category"
        onClose={() => setModalOpen(false)}
      >
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>
              Category Name *
            </label>

            <input
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value
                })
              }
              placeholder="Example: Electronics"
              autoFocus
            />

            {error && (
              <span className="form-error">
                {error}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>
              Description
            </label>

            <textarea
              rows="4"
              value={form.description}
              onChange={(event) =>
                setForm({
                  ...form,
                  description:
                    event.target.value
                })
              }
              placeholder="Describe this category..."
            />
          </div>

          <div className="form-group">
            <label>
              Category Icon
            </label>

            <select
              value={form.icon}
              onChange={(event) =>
                setForm({
                  ...form,
                  icon: event.target.value
                })
              }
            >
              <option value="Laptop">
                Electronics
              </option>

              <option value="Shirt">
                Fashion
              </option>

              <option value="Home">
                Home
              </option>

              <option value="Sparkles">
                Beauty
              </option>

              <option value="Dumbbell">
                Sports
              </option>
            </select>
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
              <FolderPlus size={17} />
              Add Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}