import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchResults: any[];
  isSearching: boolean;
  searchError: string | null;
}

const initialState: SearchState = {
  searchResults: [],
  isSearching: false,
  searchError: null,
};

export const searchUser: any = createAsyncThunk(
  "search/searchUser",
  async ({ nameUser, listUser }: { nameUser: string; listUser: any[] }) => {
    const getFriends = listUser.filter(
      (user: any) => user.userName === nameUser
    );

    const filteredUsers = getFriends.filter(
      (user) => user.userName === nameUser
    );
    return filteredUsers;
  }
);
export const searchGroup: any = createAsyncThunk(
  "search/searchGroup",
  async ({ nameGroup, listGroup }: { nameGroup: string; listGroup: any[] }) => {
    const res = listGroup.filter((group: any) => group.bio === nameGroup);
    return res;
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: [],
    group: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.fulfilled, (state: any, action: any) => {
        state.search = action.payload;
      })
      .addCase(searchGroup.fulfilled, (state: any, action: any) => {
        state.group = action.payload;
      });
  },
});

export default searchSlice.reducer;
