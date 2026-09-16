import {
  BarChart3,
  Bell,
  Boxes,
  ChevronLeft,
  ClipboardList,
  Grid3X3,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Store,
  Users,
  X
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Products",
    path: "/products",
    icon: ShoppingBag
  },
  {
    label: "Orders",
    path: "/orders",
    icon: ClipboardList
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: Boxes
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users
  },
  {
    label: "Categories",
    path: "/categories",
    icon: Grid3X3
  }
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="sidebar-mobile-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Store size={21} />
          </div>

          <div>
            <strong>E-Commerce</strong>
            <span>Dashboard</span>
          </div>

          <button
            className="sidebar-close"
            onClick={onClose}
            type="button"
          >
            <X size={19} />
          </button>
        </div>

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        <nav className="sidebar-nav">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-section-title">
          SYSTEM
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/notifications"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Bell size={19} />
            <span>Notifications</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-support">
            <div className="support-icon">
              <BarChart3 size={18} />
            </div>

            <div>
              <strong>Store Overview</strong>
              <span>Manage your business</span>
            </div>
          </div>

          <div className="sidebar-footer">
            <ChevronLeft size={15} />
            <span>Admin Panel</span>
          </div>
        </div>
      </aside>
    </>
  );
}