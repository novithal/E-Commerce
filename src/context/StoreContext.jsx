import { createContext, useContext, useState } from "react";

import {
  initialCategories,
  initialProducts,
  initialOrders,
  initialCustomers
} from "../data/mockData";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [customers, setCustomers] = useState(initialCustomers);

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now()
    };

    setCategories((current) => [...current, newCategory]);

    return newCategory;
  };

  const updateCategory = (id, updates) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? { ...category, ...updates }
          : category
      )
    );
  };

  const deleteCategory = (id) => {
    setCategories((current) =>
      current.filter((category) => category.id !== id)
    );

    setProducts((current) =>
      current.filter((product) => product.categoryId !== id)
    );
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now()
    };

    setProducts((current) => [newProduct, ...current]);

    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? { ...product, ...updates }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  return (
    <StoreContext.Provider
      value={{
        categories,
        products,
        orders,
        customers,

        addCategory,
        updateCategory,
        deleteCategory,

        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }

  return context;
}