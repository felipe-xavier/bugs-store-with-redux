import configureStore from "./myStore/configureStore";
// import { bugAdded, bugRemoved, bugResolved } from "./myStore/bugs";
import { projectAdded } from "./myStore/projects";

const store = configureStore()

store.dispatch(projectAdded({name: 'First Project'}))
console.log(store.getState())

// const unsubscribe1 = store.subscribe(() => {
//   console.log("Store changed 1!", store.getState())
// })

// const unsubscribe2 = store.subscribe(() => {
//   console.log("Store changed 2!", store.getState())
// })

// store.dispatch(bugAdded({description: "Bug-1"}));
// store.dispatch(bugAdded({description: "Bug-2"}));

// unsubscribe2();

// store.dispatch(bugResolved({id: 1}));

// store.dispatch(bugRemoved({id: 2}));
