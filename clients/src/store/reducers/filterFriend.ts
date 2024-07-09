import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: any = {
  filter: [],
};

export const filterUser: any = createAsyncThunk(
  "/filter/getUsers",
  async ({ listPost, listUser }: { listPost: any[]; listUser: any[] }) => {
    return { listPost, listUser };
  }
);

const filterReducer = createSlice({
  name: "filter",
  initialState: {
    filter: initialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filterUser.fulfilled, (state, action) => {
      const { listPost, listUser } = action.payload;
      const filteredUserNames = listPost
        .map((postUserName: any) => {
          const user = listUser.find(
            (user: any) => user.userName === postUserName
          );
          return user ? user.userName : null;
        })
        .filter((userName: any) => userName !== null);
      state.filter = filteredUserNames;
    });
  },
});

export default filterReducer.reducer;
