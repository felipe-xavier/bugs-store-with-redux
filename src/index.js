import configureStore from "./store/configureStore";
import { loadBugs, addBug, resolveBug, assignBugToUser } from "./store/bugs";
// import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";
// import { getUnresolvedBugs, getAssigneeBugs } from './store/bugs';
// import { projectAdded } from "./store/projects";
// import { userAdded } from './store/users';

const store = configureStore();

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(addBug({ description: "my bug" })), 500);

setTimeout(() => store.dispatch(resolveBug(2)), 1000);

setTimeout(() => console.log(store.getState()), 1500);

setTimeout(() => store.dispatch(assignBugToUser(4, 1)), 2000);


// setTimeout(() => store.dispatch(loadBugs()), 2000);

// store.dispatch(projectAdded({ name: 'First Project' }))

// store.dispatch(userAdded({ name: 'Felipe' }))
// store.dispatch(userAdded({ name: 'Naiara' }))

// store.dispatch(bugAdded({ description: "Bug-1", assignee: 0 }));
// store.dispatch(bugAdded({ description: "Bug-2", assignee: 1 }));
// store.dispatch(bugAdded({ description: "Bug-3" }));

// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(bugRemoved({ id: 3 }));

// console.log(store.getState())

// console.log(getUnresolvedBugs(store.getState()))

// const bugs = getAssigneeBugs(1)(store.getState())
// console.log(bugs);