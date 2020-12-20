import reducer from "./bugs";
import { configureStore } from "@reduxjs/toolkit";

export default function() {
  return configureStore({ reducer });
};
