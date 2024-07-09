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
    const updatedFriendsList = [...user.friends, newFriend];
    const updateRes = await axios.put(`http://localhost:8082/users/${userId}`, {
      ...user,
      friends: updatedFriendsList,
    });
    return updateRes.data;
  }
);

const addFriendReducer = createSlice({
  name: "addFriend",
  initialState: {
    addFriend: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFriends.fulfilled, (state: any, action: any) => {
      state.addFriend = action.payload;
    });
  },
});

export default addFriendReducer.reducer;
