import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";

import PageHeader from "../components/PageHeader";

export default function Profile({
  showToast
}) {
  const [name, setName] =
    useState("Novitha");

  const [email, setEmail] =
    useState("novi@example.com");

  const [phone, setPhone] =
    useState("+91 98765 43210");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      showToast?.(
        "Name and email are required.",
        "error"
      );
      return;
    }

    showToast?.(
      "Profile updated successfully."
    );
  };

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Manage your administrator profile information."
      />

      <div className="profile-page-grid">
        <div className="dashboard-card profile-summary">
          <div className="profile-avatar-large">
            NP
          </div>

          <h2>{name}</h2>

          <p>Administrator</p>

          <span>
            E-Commerce Dashboard
          </span>
        </div>

        <div className="dashboard-card">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-with-icon">
                <User size={17} />

                <input
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>

              <div className="input-with-icon">
                <Mail size={17} />

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone</label>

              <div className="input-with-icon">
                <Phone size={17} />

                <input
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value
                    )
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}