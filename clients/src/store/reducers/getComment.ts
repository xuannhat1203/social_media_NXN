import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const intialComment: any[] = [];
export const listComment: any = createAsyncThunk(
  "comment/getComment",
  async () => {
    const res = await axios.get("http://localhost:8082/comments");
    return res.data;
  }
);
export const addComment: any = createAsyncThunk(
  "comment/addComment",
  async (newComments: any) => {
    const res = await axios.post("http://localhost:8082/comments", newComments);
    return res.data;
  }
);

const commentReducer = createSlice({
  name: "comment",
  initialState: {
    comment: intialComment,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listComment.fulfilled, (state: any, action: any) => {
        state.comment = action.payload;
      })
      .addCase(addComment.fulfilled, (state: any, action: any) => {
        state.comment.push(action.payload);
      });
  },
});

export default commentReducer.reducer;
