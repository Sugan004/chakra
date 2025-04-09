import React, { useState, useEffect, createContext, useContext } from "react";
import UserTable from "./components/UserTable";
import AddUserPopup from "./components/AddUserPopup";
import EditUserPopup from "./components/EditUserPopup";
import "./index.css";

// Create Context for User Management
const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Fetch users on initial load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = async (newUser) => {
    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      setUsers([...users, data]);
      setShowAddPopup(false); 
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      const res = await fetch(`http://localhost:4000/users/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      await res.json();
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null); 
    } catch (err) {
      console.error("Error editing user:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:4000/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <UserContext.Provider value={{ users, handleAddUser, handleEditUser, handleDeleteUser, setEditingUser, editingUser, showAddPopup, setShowAddPopup }}>
      <div className="container">
        <nav className="navbar">
          <h1>My Website</h1>
          <button className="add-user-btn" onClick={() => setShowAddPopup(true)}>Add User</button>
        </nav>

        <UserTable />
        {showAddPopup && <AddUserPopup />}
        {editingUser && <EditUserPopup key={editingUser.id} />} {/* Ensure re-render when editingUser changes */}
      </div>
    </UserContext.Provider>
  );
};

export default App;
