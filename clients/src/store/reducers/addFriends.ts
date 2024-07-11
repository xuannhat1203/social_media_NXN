import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface NewFriend {
  userId: number;
  userName: string;
  add_at: string;
}

export const addFriends: any = createAsyncThunk(
  "friends/addFriend",
  async ({ userId, newFriend }: { userId: number; newFriend: NewFriend }) => {
    const res = await axios.get(`http://localhost:8082/users/${userId}`);
    const user = res.data;
    const updatedFriendsList = [...user.sugguest, newFriend];
    const updateRes = await axios.put(`http://localhost:8082/users/${userId}`, {
      ...user,
      sugguest: updatedFriendsList,
    });
    return updateRes.data;
  }
);

export const addFriend2s: any = createAsyncThunk(
  "friends/addFriend2s",
  async ({ userId, newFriend }: { userId: number; newFriend: NewFriend }) => {
    const res = await axios.get(`http://localhost:8082/users/${userId}`);
    const user = res.data;
    const updatedFriendsList = [...user.friends, newFriend];
    const updateRes = await axios.put(`http://localhost:8082/users/${userId}`, {
      ...user,
      friends: updatedFriendsList,
    });
    return updateRes.data;
  }
);

interface AddFriendState {
  addFriend: NewFriend[];
  addFriend2s: NewFriend[];
}

const addFriendReducer = createSlice({
  name: "addFriend",
  initialState: {
    addFriend: [],
    addFriend2s: [],
  } as AddFriendState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFriends.fulfilled, (state, action) => {
        state.addFriend = action.payload;
      })
      .addCase(addFriend2s.fulfilled, (state, action) => {
        state.addFriend2s = action.payload;
      });
  },
});

export default addFriendReducer.reducer;
