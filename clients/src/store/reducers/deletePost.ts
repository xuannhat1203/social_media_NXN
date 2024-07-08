import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialDelete: any = [];
export const deletePost: any = createAsyncThunk(
  "delete/deletePost",
  async (id: number) => {
    const res = await axios.delete(`http://localhost:8082/post/${id}`);
    return res.data;
  }
);
const deletePostReducer = createSlice({
  name: "deletePost",
  initialState: {
    deletePost: initialDelete,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const postId = action.payload;
      state.deletePost = state.deletePost.filter(
        (post: any) => post.id !== postId
      );
    });
  },
});
export default deletePostReducer.reducer;
