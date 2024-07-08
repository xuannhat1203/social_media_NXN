import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialPost: any = [];
export const getPost: any = createAsyncThunk("getPost/getPost", async () => {
  const res = await axios.get("http://localhost:8082/post");
  return res.data;
});
const postReducer = createSlice({
  name: "post",
  initialState: {
    post: initialPost,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPost.fulfilled, (state: any, action: any) => {
      state.post = action.payload;
    });
  },
});
export default postReducer.reducer;
