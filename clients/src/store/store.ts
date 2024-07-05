import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/getUser";
import { combineReducers } from "redux";
import filterReducer from "./reducers/filterFriend";
import postReducer from "./reducers/getListPost";
import addReducer from "./reducers/addUser";
const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
  post: postReducer,
  add: addReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
