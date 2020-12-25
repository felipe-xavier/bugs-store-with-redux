import reducer from "./reducer";
import logger from "./middlewares/logger";
import toast from './middlewares/toast';
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

export default function() {
  return configureStore({ 
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({destination: "console"}),
      toast
    ]
  });
};
