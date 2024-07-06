import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialPost: any = [];

export const addPost: any = createAsyncThunk(
  "post/addPost",
  async (newPost: any) => {
    const res = await axios.post("http://localhost:8082/post", newPost);
    return res.data;
  }
);

const addPostReducer = createSlice({
  name: "addPost",
  initialState: {
    addPost: initialPost,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPost.fulfilled, (state: any, action: any) => {
      state.addPost.push(action.payload);
    });
  },
});

export default addPostReducer.reducer;
