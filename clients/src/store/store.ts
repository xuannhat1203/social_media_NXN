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
const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
  post: postReducer,
  add: addReducer,
  addPost: addPostReducer,
  update: updateReducer,
  delete: deleteReducer,
  deletePost: deletePostReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
