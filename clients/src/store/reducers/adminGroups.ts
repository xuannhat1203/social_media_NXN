import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const changeStatusGroups: any = createAsyncThunk(
  "change/changeStatusGroups",
  async (id: number) => {
    const res = await axios.get(`http://localhost:8082/groups/${id}`);
    const group = res.data;
    const update = {
      ...group,
      status: !group.status,
    };
    await axios.put(`http://localhost:8082/groups/${id}`, update);
    return update;
  }
);
export const searchGroup: any = createAsyncThunk(
  "search/searchGroup",
  async (nameGroups: string) => {
    const res = await axios.get(`http://localhost:8082/groups`);
    const listGroups = res.data;
    const find = listGroups.filter((group: any) =>
      group.bio.toLowerCase().includes(nameGroups.toLowerCase())
    );
    return find;
  }
);

const adminGroupReducer: any = createSlice({
  name: "admin",
  initialState: {
    change2: [],
    find2: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeStatusGroups.fulfilled, (state: any, action: any) => {
        const updatedGroup = action.payload;
        state.change2 = state.change2.map((group: any) =>
          group.id === updatedGroup.id ? updatedGroup : group
        );
      })
      .addCase(searchGroup.fulfilled, (state: any, action: any) => {
        state.find2 = action.payload;
      });
  },
});

export default adminGroupReducer.reducer;
