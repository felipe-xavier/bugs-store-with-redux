import reducer from "./reducer";
import logger from "./middlewares/logger";
import toast from './middlewares/toast';
import api from "./middlewares/api";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

export default () => {
  return configureStore({ 
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      // logger({destination: "console"}),
      toast,
      api
    ]
  });
};
