import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const AddUserPopup = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = () => {
    setError("");
    if (!name || !email) {
      setError("Both fields are required!");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Invalid email format!");
      return;
    }

    dispatch(addUser({ name, email }));
    setShowPopup(false);
    setName("");
    setEmail("");
  };

  return (
    <div>
      <button className="add-user-btn" onClick={() => setShowPopup(true)}>
        Add User
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add User</h2>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Add</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserPopup;
