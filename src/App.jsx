import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import Layout from "./components/Layout";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location.pathname]);

  return null;
}

export default function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type
    });

    window.setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  return (
    <>
      <ScrollToTop />

      <Layout>
        <div className="page-enter">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/products"
              element={<Products showToast={showToast} />}
            />

            <Route
              path="/orders"
              element={<Orders showToast={showToast} />}
            />

            <Route
              path="/inventory"
              element={<Inventory showToast={showToast} />}
            />

            <Route
              path="/customers"
              element={<Customers />}
            />

            <Route
              path="/categories"
              element={<Categories showToast={showToast} />}
            />

            <Route
              path="/categories/:categoryId"
              element={<CategoryDetails />}
            />

            <Route
              path="/notifications"
              element={<Notifications />}
            />

            <Route
              path="/profile"
              element={<Profile showToast={showToast} />}
            />

            <Route
              path="/settings"
              element={<Settings showToast={showToast} />}
            />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </div>
      </Layout>

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </>
  );
}