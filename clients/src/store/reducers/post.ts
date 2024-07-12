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

export const getListStoryFriends: any = createAsyncThunk(
  "get/getStory",
  async () => {
    const res = await axios.get("http://localhost:8082/story");
    return res.data;
  }
);

export const addStory: any = createAsyncThunk(
  "story/addStory",
  async (story: any) => {
    const res = await axios.post(`http://localhost:8082/story`, story);
    return res.data;
  }
);

const addPostReducer = createSlice({
  name: "addPost",
  initialState: {
    addPost: initialPost,
    story: [],
    addNewStory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state: any, action: any) => {
        state.addPost.push(action.payload);
      })
      .addCase(getListStoryFriends.fulfilled, (state: any, action: any) => {
        state.story = action.payload;
      })
      .addCase(addStory.fulfilled, (state: any, action: any) => {
        state.addNewStory.push(action.payload);
      });
  },
});

export default addPostReducer.reducer;
