import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialGroup: any = [];
export const addGroup: any = createAsyncThunk(
  "add/addGroup",
  async (newGroup: any) => {
    const res = await axios.post(`http://localhost:8082/groups`, newGroup);
    return res.data;
  }
);
const groupReducer: any = createSlice({
  name: "addGroup",
  initialState: {
    groups: initialGroup,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addGroup.fulfilled, (state: any, action: any) => {
      state.groups = action.payload;
    });
  },
});
export default groupReducer.reducer;
