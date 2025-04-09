import React, { useState, useEffect } from "react";
import { useUserContext } from "../App";

const EditUserPopup = () => {
  const { editingUser, setEditingUser, handleEditUser } = useUserContext();

  // Initialize state with default values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Update state when editingUser changes
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name || "");
      setEmail(editingUser.email || "");
    }
  }, [editingUser]);

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = () => {
    setError(""); // Reset error before validation

    if (!name || !email) {
      setError("Both fields are required!");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format!");
      return;
    }

    handleEditUser({ id: editingUser.id, name, email });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit User</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <button className="save-btn" onClick={handleSubmit}>
          Save
        </button>
        <button className="cancel-btn" onClick={() => setEditingUser(null)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUserPopup;
