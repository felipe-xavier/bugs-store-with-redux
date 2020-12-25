import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

export default function() {
  return configureStore({ reducer });
};
