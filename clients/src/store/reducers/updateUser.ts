import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = [];
export const updateUser: any = createAsyncThunk(
  "update/updateUser",
  async (update: any) => {
    const res = await axios.put("  http://localhost:8082/users", update);
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
    builder.addCase(updateUser.fulfilled, (state: any, action: any) => {});
  },
});
export default updateReducer.reducer;
