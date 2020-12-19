import myReducer from "./bugs";
// The same as 
// import createStore from "redux";
import createStore from '../myRedux/myRedux';

export default function configureStore() {
  const store = createStore(myReducer);
  return store;
};
