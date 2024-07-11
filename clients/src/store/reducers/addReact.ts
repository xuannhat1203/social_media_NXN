import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

export const clickReact: any = createAsyncThunk(
  "react/setLike",
  async ({ id, idPost }: { id: number; idPost: number }) => {
    try {
      const res = await axios.get(`http://localhost:8082/post/${idPost}`);
      const react = {
        user_id: id,
        nameIsReact: "like",
        create_at: dayjs().toISOString(),
      };
      const updateReact = {
        ...res.data,
        reactions: [...res.data.reactions, react],
      };
      await axios.put(`http://localhost:8082/post/${idPost}`, updateReact);
      return updateReact;
    } catch (error) {
      throw new Error("Failed to update reaction");
    }
  }
);

const reactReducer = createSlice({
  name: "react",
  initialState: {
    reactions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clickReact.fulfilled, (state, action) => {
      state.reactions = action.payload.reactions;
    });
  },
});

export default reactReducer.reducer;
