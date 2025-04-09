import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, clearEditingUser } from "../redux/userSlice";

const EditUserPopup = () => {
  const dispatch = useDispatch();
  const editingUser = useSelector((state) => state.users.editingUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

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

    dispatch(editUser({ id: editingUser.id, name, email }));
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
        <button onClick={handleSubmit}>Save</button>
        <button onClick={() => dispatch(clearEditingUser())}>Cancel</button>
      </div>
    </div>
  );
};

export default EditUserPopup;
