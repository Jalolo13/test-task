import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function (_, { rejectWithValue }) {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);

      const students = await res.data;
      return students;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },

    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.users = action.payload;
    },

    [fetchUsers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
