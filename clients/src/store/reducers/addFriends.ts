import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface NewFriend {
  userId: number;
  userName: string;
  add_at: string;
}

export const addFriendToUser: any = createAsyncThunk(
  "friends/addFriendToUser",
  async ({ userId, newFriend }: { userId: number; newFriend: NewFriend }) => {
    const res = await axios.get(`http://localhost:8082/users/${userId}`);
    const user = res.data;
    const isAlreadyFriend = user.invitation.some(
      (friend: any) => friend.userId === newFriend.userId
    );
    if (isAlreadyFriend) {
      throw new Error("This user is already in the invitation list.");
    }

    const updatedFriendsList = [...user.invitation, newFriend];
    const updateRes = await axios.put(`http://localhost:8082/users/${userId}`, {
      ...user,
      invitation: updatedFriendsList,
    });
    return updateRes.data;
  }
);
export const addFriendToSuggested: any = createAsyncThunk(
  "friends/addFriendToSuggested",
  async ({ userId, newFriend }: { userId: number; newFriend: NewFriend }) => {
    const res = await axios.get(`http://localhost:8082/users/${userId}`);
    const user = res.data;
    const isAlreadyFriend = user.friends.some(
      (friend: any) => friend.userId === newFriend.userId
    );
    if (isAlreadyFriend) {
      throw new Error("This user is already in the friends list.");
    }
    const updatedFriendsList = [...user.friends, newFriend];
    const updatedInvitationList = user.invitation.filter(
      (friend: any) => friend.userId !== newFriend.userId
    );

    const updateRes = await axios.put(`http://localhost:8082/users/${userId}`, {
      ...user,
      friends: updatedFriendsList,
      invitation: updatedInvitationList,
    });
    return updateRes.data;
  }
);

const friendSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    invitation: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFriendToUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFriendToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload.friends;
      })
      .addCase(addFriendToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addFriendToSuggested.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFriendToSuggested.fulfilled, (state, action) => {
        state.loading = false;
        state.invitation = action.payload.invitation;
      })
      .addCase(addFriendToSuggested.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default friendSlice.reducer;
