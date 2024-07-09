import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialGroup: any = [];
export const getGroup2: any = createAsyncThunk("group/getGroup", async () => {
  const res = await axios.get("http://localhost:8082/groups");
  return res.data;
});
const groupReducer2: any = createSlice({
  name: "group",
  initialState: {
    group: initialGroup,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroup2.fulfilled, (state: any, action: any) => {
      state.group = action.payload;
    });
  },
});
export default groupReducer2.reducer;
