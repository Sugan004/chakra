import React, { useState } from "react";
import { useUserContext } from "../App";

const AddUserPopup = () => {
  const { handleAddUser, setShowAddPopup } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = () => {
    setLocalError(""); 
    if (!name || !email) {
      setLocalError("Both fields are required!");
      return;
    }
    if (!isValidEmail(email)) {
      setLocalError("Invalid email format!");
      return;
    }
    handleAddUser({ name, email });
    setShowAddPopup(false); 
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add User</h2>
        {localError && <p className="error">{localError}</p>}
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <button className="save-btn" onClick={handleSubmit}>Add</button>
        <button className="cancel-btn" onClick={() => setShowAddPopup(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default AddUserPopup;
