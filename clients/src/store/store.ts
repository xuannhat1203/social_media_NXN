import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/getUser";
import { combineReducers } from "redux";
import filterReducer from "./reducers/filterFriend";
import postReducer from "./reducers/getListPost";
import addReducer from "./reducers/addUser";
import addPostReducer from "./reducers/post";
import updateReducer from "./reducers/updateUser";
import deleteReducer from "./reducers/deleteFriends";
import deletePostReducer from "./reducers/deletePost";
import addFriendReducer from "./reducers/addFriends";
import groupReducer from "./reducers/createGroup";
import commentReducer from "./reducers/getComment";
import searchSlice from "./reducers/search";
import groupReducer2 from "./reducers/getListGroup";
const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
  post: postReducer,
  add: addReducer,
  addPost: addPostReducer,
  update: updateReducer,
  delete: deleteReducer,
  deletePost: deletePostReducer,
  addFriends: addFriendReducer,
  groups: groupReducer,
  comment: commentReducer,
  search: searchSlice,
  group: groupReducer2,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
