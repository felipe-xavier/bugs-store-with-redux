import configureStore from "./store/configureStore";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";
import { getUnresolvedBugs } from './store/bugs';
import { getAssigneeBugs } from './store/bugs';
import { projectAdded } from "./store/projects";
import { userAdded } from './store/users';

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