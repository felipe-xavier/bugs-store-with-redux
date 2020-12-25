import configureStore from "./myStore/configureStore";
import { bugAdded, bugRemoved, bugResolved } from "./myStore/bugs";
import { getUnresolvedBugs } from './myStore/bugs';
import { getAssigneeBugs } from './myStore/bugs';
import { projectAdded } from "./myStore/projects";
import { userAdded } from './myStore/users';

const store = configureStore()

store.dispatch(projectAdded({ name: 'First Project' }))

store.dispatch(userAdded({ name: 'Felipe' }))
store.dispatch(userAdded({ name: 'Naiara' }))

store.dispatch(bugAdded({ description: "Bug-1", assignee: 0 }));
store.dispatch(bugAdded({ description: "Bug-2", assignee: 1 }));
store.dispatch(bugAdded({ description: "Bug-3" }));

store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugRemoved({ id: 3 }));

console.log(store.getState())

console.log(getUnresolvedBugs(store.getState()))

const bugs = getAssigneeBugs(1)(store.getState())
console.log(bugs);