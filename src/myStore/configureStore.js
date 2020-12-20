import myReducer from "./bugs";
import createStore from "redux";
import { configureStore } from "@reduxjs/toolkit";

export default function() {
  return configureStore({ myReducer });
};
