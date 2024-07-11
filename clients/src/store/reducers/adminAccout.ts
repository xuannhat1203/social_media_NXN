import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const changeStatus: any = createAsyncThunk(
  "change/changeStatus",
  async (id: number) => {
    const res = await axios.get(`http://localhost:8082/users/${id}`);
    const user = res.data;
    const update = {
      ...user,
      statusLock: !user.statusLock,
    };
    console.log(update);
    await axios.put(`http://localhost:8082/users/${id}`, update);
    return update;
  }
);
export const searchUser: any = createAsyncThunk(
  "search/searchUser",
  async (nameUser: string) => {
    const res = await axios.get(`http://localhost:8082/users`);
    const listUser = res.data;
    const find = listUser.filter((user: any) => user.userName === nameUser);
    return find;
  }
);
const adminReducer: any = createSlice({
  name: "admin",
  initialState: {
    change: [],
    find: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeStatus.fulfilled, (state: any, action: any) => {
        const updatedUser = action.payload;
        state.change = state.change.map((user: any) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(searchUser.fulfilled, (state: any, action: any) => {
        state.find = action.payload;
      });
  },
});
export default adminReducer.reducer;
