import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get users from API
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch("http://localhost:4000/users");
  return res.json();
});

// Add new user
export const addUser = createAsyncThunk("users/add", async (user) => {
  const res = await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
});

// Edit user
export const editUser = createAsyncThunk("users/edit", async (user) => {
  await fetch(`http://localhost:4000/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return user;
});

// Delete user
export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await fetch(`http://localhost:4000/users/${id}`, { method: "DELETE" });
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    editingUser: null,
  },
  reducers: {
    setEditingUser: (state, action) => {
      state.editingUser = action.payload;
    },
    clearEditingUser: (state) => {
      state.editingUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
        state.editingUser = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setEditingUser, clearEditingUser } = userSlice.actions;
export default userSlice.reducer;
