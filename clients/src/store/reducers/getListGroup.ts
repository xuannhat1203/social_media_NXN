import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialGroup: any = [];
export const getGroup2: any = createAsyncThunk("group/getGroup", async () => {
  const res = await axios.get("http://localhost:8082/groups");
  return res.data;
});
export const addMember: any = createAsyncThunk(
  "member/addMember",
  async ({ idGroup, member }: { idGroup: number; member: any }) => {
    const res = await axios.get(`http://localhost:8082/groups/${idGroup}`);
    const groups = res.data;
    const update = {
      ...groups,
      member: [...groups.member, member],
    };
    await axios.put(`http://localhost:8082/groups/${idGroup}`, update);
    return update;
  }
);
const groupReducer2: any = createSlice({
  name: "group",
  initialState: {
    group: initialGroup,
    addmember: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroup2.fulfilled, (state: any, action: any) => {
        state.group = action.payload;
      })
      .addCase(addMember.fulfilled, (state: any, action: any) => {
        state.addmember = action.payload;
      });
  },
});
export default groupReducer2.reducer;
