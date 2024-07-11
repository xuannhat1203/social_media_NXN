import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialBlock: any = [];

export const addToBlock: any = createAsyncThunk(
  "add/addToBlock",
  async ({ id, nameIsBlocked }: { id: number; nameIsBlocked: string }) => {
    const res = await axios.get(`http://localhost:8082/post/${id}`);
    const updateBlock = {
      ...res.data,
      block: Array.isArray(res.data.block)
        ? [...res.data.block, nameIsBlocked]
        : [nameIsBlocked],
    };
    await axios.put(`http://localhost:8082/post/${id}`, updateBlock);
    return updateBlock;
  }
);

const blockReducer = createSlice({
  name: "block",
  initialState: {
    block: initialBlock,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToBlock.fulfilled, (state: any, action: any) => {
      state.block = action.payload.block;
    });
  },
});

export default blockReducer.reducer;
