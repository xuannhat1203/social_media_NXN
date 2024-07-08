import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialDelete: any = [];

export const deleteUsers: any = createAsyncThunk(
  "delete/deleteUser",
  async ({ userId, friendId }: { userId: number; friendId: number }) => {
    const res = await axios.get(`http://localhost:8082/users/${userId}`);
    const user: any = res.data;

    const updatedFriends = user.friends.filter(
      (friend: any) => friend.userId !== friendId
    );

    await axios.put(`http://localhost:8082/users/${userId}`, {
      ...user,
      friends: updatedFriends,
    });

    return { userId, friendId };
  }
);

const deleteReducer = createSlice({
  name: "deleteFriend",
  initialState: {
    delete: initialDelete,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      const { userId, friendId } = action.payload;
      const user = state.delete.find((user: any) => user.id === userId);
      if (user) {
        user.friends = user.friends.filter(
          (friend: any) => friend.userId !== friendId
        );
      }
    });
  },
});

export default deleteReducer.reducer;
