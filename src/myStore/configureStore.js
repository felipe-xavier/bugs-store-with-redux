import myReducer from "./bugs";
import createStore from "redux";

export default function configureStore() {
  const store = createStore(myReducer);
  return store;
};
