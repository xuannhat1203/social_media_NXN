import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const intialComment: any = [];
export const listComment: any = createAsyncThunk(
  "comment/getComment",
  async () => {
    const res = await axios.get("http://localhost:8082/comments");
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
    builder.addCase(listComment.fulfilled, (state: any, action: any) => {
      state.comment = action.payload;
    });
  },
});
export default commentReducer.reducer;
