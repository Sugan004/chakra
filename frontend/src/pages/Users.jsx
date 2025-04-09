import React, { useEffect } from "react";
import UserTable from "../components/UserTable";
import AddUserPopup from "../components/AddUserPopup";
import EditUserPopup from "../components/EditUserPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { editingUser } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <UserTable />
      <AddUserPopup />
      {editingUser && <EditUserPopup />}
    </div>
  );
};

export default Users;
