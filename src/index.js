import configureStore from "./myStore/configureStore";
import { bugAdded, bugRemoved, bugResolved } from "./myStore/bugs";

const store = configureStore()

const unsubscribe1 = store.subscribe(() => {
  console.log("Store changed 1!", store.getState())
})

const unsubscribe2 = store.subscribe(() => {
  console.log("Store changed 2!", store.getState())
})

store.dispatch(bugAdded({description: "Bug-1"}));
store.dispatch(bugAdded({description: "Bug-2"}));

unsubscribe2();

store.dispatch(bugResolved({id: 1}));

// store.dispatch(bugRemoved({id: 2}));
