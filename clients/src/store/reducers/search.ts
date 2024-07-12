import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const searchUser: any = createAsyncThunk(
  "search/searchUser",
  async ({ nameUser, listUser }: { nameUser: string; listUser: any[] }) => {
    const lowercasedName = nameUser.toLowerCase();
    const filteredUsers = listUser.filter((user: any) =>
      user.userName.toLowerCase().includes(lowercasedName)
    );
    return filteredUsers;
  }
);

export const searchGroup: any = createAsyncThunk(
  "search/searchGroup",
  async ({ nameGroup, listGroup }: { nameGroup: string; listGroup: any[] }) => {
    const lowercasedName = nameGroup.toLowerCase();
    const filteredGroups = listGroup.filter((group: any) =>
      group.bio.toLowerCase().includes(lowercasedName)
    );
    return filteredGroups;
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
