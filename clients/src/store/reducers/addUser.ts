import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialUser: any[] = [];
export const addUser: any = createAsyncThunk(
  "add/addUser",
  async (newUser: any) => {
    const res = await axios.post("http://localhost:8082/users", newUser);
    return res.data;
  }
);

const addReducer = createSlice({
  name: "add",
  initialState: {
    add: initialUser,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state: any, action: any) => {
      state.add.push(action.payload);
    });
  },
});

export default addReducer.reducer;
