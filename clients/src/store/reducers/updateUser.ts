import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = [];

export const updateUser: any = createAsyncThunk(
  "update/updateUser",
  async (update: any) => {
    const existingUserResponse = await axios.get(
      `http://localhost:8082/users/${update.id}`
    );
    const existingUser = existingUserResponse.data;

    const updatedUser = {
      ...existingUser,
      userName: update.userName,
      email: update.email,
      avatar: update.avatar,
      passWord: update.password,
    };

    const res = await axios.put(
      `http://localhost:8082/users/${update.id}`,
      updatedUser
    );
    return res.data;
  }
);

const updateReducer = createSlice({
  name: "update",
  initialState: {
    update: initialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state: any, action: any) => {
      state.update = action.payload;
    });
  },
});

export default updateReducer.reducer;
