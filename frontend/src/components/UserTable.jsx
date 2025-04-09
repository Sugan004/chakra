import React from "react";
import { useUserContext } from "../App";

const UserTable = () => {
  const { users, setEditingUser, handleDeleteUser } = useUserContext();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button className="edit-btn" onClick={() => setEditingUser(user)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
