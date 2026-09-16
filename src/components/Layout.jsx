
import { useState } from "react";

import {
  AlertTriangle,
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  User,
  X
} from "lucide-react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import Sidebar from "./Sidebar";

const notifications = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "New order received",
    text: "Order #ORD-1048 has been placed.",
    time: "5 min ago"
  },
  {
    id: 2,
    icon: AlertTriangle,
    title: "Low stock alert",
    text: "Wireless Headphones are running low.",
    time: "18 min ago"
  },
  {
    id: 3,
    icon: Package,
    title: "Order delivered",
    text: "Order #ORD-1042 was delivered.",
    time: "1 hour ago"
  }
];

const pageInfo = {
  "/dashboard": {
    title: "Dashboard",
    subtitle:
      "Welcome back! Here's what's happening with your store."
  },
  "/products": {
    title: "Products",
    subtitle:
      "Manage your products and product catalog."
  },
  "/orders": {
    title: "Orders",
    subtitle:
      "Track and manage customer orders."
  },
  "/inventory": {
    title: "Inventory",
    subtitle:
      "Monitor your product stock and inventory."
  },
  "/customers": {
    title: "Customers",
    subtitle:
      "Manage your customers and their activity."
  },
  "/categories": {
    title: "Categories",
    subtitle:
      "Organize your product categories."
  },
  "/notifications": {
    title: "Notifications",
    subtitle:
      "View your latest store notifications."
  },
  "/profile": {
    title: "My Profile",
    subtitle:
      "Manage your administrator profile."
  },
  "/settings": {
    title: "Settings",
    subtitle:
      "Manage your dashboard preferences."
  }
};

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  let current =
    pageInfo[location.pathname] ||
    pageInfo["/dashboard"];

  if (
    location.pathname.startsWith(
      "/categories/"
    )
  ) {
    current = {
      title: "Category Details",
      subtitle:
        "View products related to this category."
    };
  }

  const closeMenus = () => {
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <main className="main">
        <header className="topbar">

          {/* Mobile Menu */}
          <button
            type="button"
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu size={21} />
          </button>

          {/* Page Heading */}
          <div className="topbar-heading">
            <h1>{current.title}</h1>
            <p>{current.subtitle}</p>
          </div>

          {/* Top Actions */}
          <div className="top-actions">

            {/* 
              TOP SEARCH REMOVED
              No Search icon
              No Search input
            */}

            {/* Notifications */}
            <div className="topbar-dropdown-wrapper">
              <button
                type="button"
                className={`icon-btn ${
                  notificationOpen
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setNotificationOpen(
                    (value) => !value
                  );

                  setProfileOpen(false);
                }}
              >
                <Bell size={19} />

                <span className="notification-count">
                  3
                </span>
              </button>

              {notificationOpen && (
                <>
                  <div
                    className="dropdown-overlay"
                    onClick={closeMenus}
                  />

                  <div className="notification-dropdown">

                    <div className="dropdown-title">
                      <div>
                        <h3>
                          Notifications
                        </h3>

                        <span>
                          3 new notifications
                        </span>
                      </div>

                      <button
                        type="button"
                        className="dropdown-close"
                        onClick={closeMenus}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="notification-list">
                      {notifications.map(
                        (item) => {
                          const Icon =
                            item.icon;

                          return (
                            <button
                              type="button"
                              className="notification-item"
                              key={item.id}
                              onClick={() => {
                                closeMenus();

                                navigate(
                                  "/notifications"
                                );
                              }}
                            >
                              <div className="notification-item-icon">
                                <Icon size={17} />
                              </div>

                              <div className="notification-item-content">
                                <strong>
                                  {item.title}
                                </strong>

                                <p>
                                  {item.text}
                                </p>

                                <small>
                                  {item.time}
                                </small>
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>

                    <button
                      type="button"
                      className="view-all-notifications"
                      onClick={() => {
                        closeMenus();

                        navigate(
                          "/notifications"
                        );
                      }}
                    >
                      View all notifications
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="topbar-dropdown-wrapper">
              <button
                type="button"
                className={`profile ${
                  profileOpen
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setProfileOpen(
                    (value) => !value
                  );

                  setNotificationOpen(false);
                }}
              >
                <div className="avatar">
                  NP
                </div>

                <div className="profile-text">
                  <b>Novitha</b>
                  <small>
                    Administrator
                  </small>
                </div>

                <ChevronDown
                  size={16}
                  className={
                    profileOpen
                      ? "chevron-rotate"
                      : ""
                  }
                />
              </button>

              {profileOpen && (
                <>
                  <div
                    className="dropdown-overlay"
                    onClick={closeMenus}
                  />

                  <div className="profile-dropdown">

                    <div className="profile-dropdown-header">
                      <div className="avatar large">
                        NP
                      </div>

                      <div>
                        <strong>
                          Novitha
                        </strong>

                        <span>
                          Administrator
                        </span>
                      </div>
                    </div>

                    <div className="profile-menu">

                      <button
                        type="button"
                        onClick={() => {
                          closeMenus();

                          navigate(
                            "/profile"
                          );
                        }}
                      >
                        <User size={17} />

                        <span>
                          My Profile
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          closeMenus();

                          navigate(
                            "/settings"
                          );
                        }}
                      >
                        <Settings size={17} />

                        <span>
                          Settings
                        </span>
                      </button>

                      <div className="profile-divider" />

                      <button
                        type="button"
                        className="logout-btn"
                        onClick={() => {
                          closeMenus();

                          navigate(
                            "/dashboard"
                          );
                        }}
                      >
                        <LogOut size={17} />

                        <span>
                          Logout
                        </span>
                      </button>

                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <section className="content">
          {children}
        </section>
      </main>
    </div>
  );
}
