import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import books from "./books";

export default combineReducers({
  auth,
  message,
  books,
});
