import reducer from "./projects";
import { configureStore } from "@reduxjs/toolkit";

export default function() {
  return configureStore({ reducer });
};
