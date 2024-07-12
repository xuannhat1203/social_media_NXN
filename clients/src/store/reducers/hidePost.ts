import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const searchPost: any = createAsyncThunk(
  "search/searchPost",
  async (namePost: string) => {
    const res = await axios.get("http://localhost:8082/post");
    const listPost = res.data;
    const find = listPost.filter((post: any) =>
      post.content.toLowerCase().includes(namePost.toLowerCase())
    );
    return find;
  }
);

export const hidePost: any = createAsyncThunk(
  "hide/hidePost",
  async (id: number) => {
    const res = await axios.get(`http://localhost:8082/post/${id}`);
    const post = res.data;
    const updata = {
      ...post,
      statusHide: !post.statusHide,
    };
    await axios.put(`http://localhost:8082/post/${id}`, updata);
    return updata;
  }
);
const hidePostReducer = createSlice({
  name: "search",
  initialState: {
    hide: [],
    search: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPost.fulfilled, (state, action) => {
        state.hide = action.payload;
      })
      .addCase(hidePost.fulfilled, (state: any, action: any) => {
        const updatePost = action.payload;
        state.search = state.search.map((post: any) => {
          post.id === post.id ? updatePost : post;
        });
      });
  },
});

export default hidePostReducer.reducer;
