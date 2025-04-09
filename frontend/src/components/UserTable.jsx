import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setEditingUser } from "../redux/userSlice";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

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
              <button onClick={() => dispatch(setEditingUser(user))}>Edit</button>
              <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
