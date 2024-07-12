import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBanner: any = createAsyncThunk("get/getBanner", async () => {
  const res = await axios.get("http://localhost:8082/banner");
  return res.data;
});
const bannerReducer: any = createSlice({
  name: "banner",
  initialState: {
    banner: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanner.fulfilled, (state: any, action: any) => {
      state.banner = action.payload;
    });
  },
});
export default bannerReducer.reducer;
