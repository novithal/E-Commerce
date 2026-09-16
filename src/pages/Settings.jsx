import { useState } from "react";

import {
  Bell,
  Lock,
  Moon,
  Save,
  ShieldCheck
} from "lucide-react";

import PageHeader from "../components/PageHeader";

export default function Settings({
  showToast
}) {
  const [notifications, setNotifications] =
    useState(true);

  const [emailAlerts, setEmailAlerts] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  const [twoFactor, setTwoFactor] =
    useState(false);

  const handleSave = () => {
    showToast?.(
      "Settings saved successfully."
    );
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure your dashboard preferences."
      />

      <div className="settings-list">
        <div className="settings-card">
          <div className="settings-icon">
            <Bell size={20} />
          </div>

          <div className="settings-content">
            <h3>Push Notifications</h3>

            <p>
              Receive notifications about new
              orders and store activity.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) =>
                setNotifications(
                  event.target.checked
                )
              }
            />

            <span />
          </label>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <Bell size={20} />
          </div>

          <div className="settings-content">
            <h3>Email Alerts</h3>

            <p>
              Receive important store updates
              by email.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(event) =>
                setEmailAlerts(
                  event.target.checked
                )
              }
            />

            <span />
          </label>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <Moon size={20} />
          </div>

          <div className="settings-content">
            <h3>Dark Mode</h3>

            <p>
              Use dark appearance for the
              dashboard.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(event) =>
                setDarkMode(
                  event.target.checked
                )
              }
            />

            <span />
          </label>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <ShieldCheck size={20} />
          </div>

          <div className="settings-content">
            <h3>Two-Factor Authentication</h3>

            <p>
              Add an additional security layer
              to your administrator account.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(event) =>
                setTwoFactor(
                  event.target.checked
                )
              }
            />

            <span />
          </label>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            <Lock size={20} />
          </div>

          <div className="settings-content">
            <h3>Password</h3>

            <p>
              Update your administrator
              password regularly.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              showToast?.(
                "Password change option opened.",
                "info"
              )
            }
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="settings-save">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
        >
          <Save size={17} />
          Save Settings
        </button>
      </div>
    </div>
  );
}