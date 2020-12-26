import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Reducer
let lastId = 0;

const newBug = (description, assignee) => ({
  id: ++lastId,
  description,
  resolved : false,
  assignee,
})

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: true,
    lastFatch: null,
  },
  reducers: {
    bugAdded: (bugs, action) => { bugs.list.push(newBug(action.payload.description, action.payload.assignee)) },

    bugRemoved: (bugs, action) => {
      const bugId = bugs.list.findIndex(bug => bug.id == action.payload.id);
      bugs.list.splice(bugId, 1);
    },

    bugResolved: (bugs, action) => { 
      const bugId = bugs.list.findIndex(bug => bug.id == action.payload.id);
      bugs.list[bugId].resolved = true;
    }
  }
})

const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  bugs => bugs.filter(bug => !bug.resolved)
)

const getAssigneeBugs = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => bug.assignee === userId)
)

export { getAssigneeBugs };
export { getUnresolvedBugs };
export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;
