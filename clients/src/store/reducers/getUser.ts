import axios from "axios";
import { User } from "../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialUser: User[] = [];

export const getUsers: any = createAsyncThunk<User[]>(
  "user/getUser",
  async () => {
    const res = await axios.get("http://localhost:8082/users");
    return res.data;
  }
);

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action: any) => {
      state.user = action.payload;
    });
  },
});

export default userReducer.reducer;
