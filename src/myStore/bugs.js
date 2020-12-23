// We have 3 actions for the Bug-tracker
// We can Add, Remove and Mark a bug as resolved.

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Reducer
let lastId = 0;

const newBug = description => ({
  id: ++lastId,
  description : description,
  resolved : false,
})

const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => { bugs.push(newBug(action.payload.description)) },

    bugRemoved: (bugs, action) => {
      const bugId = bugs.findIndex(bug => bug.id == action.payload.id);
      bugs.splice(bugId, 1);
    },

    bugResolved: (bugs, action) => { 
      const bugId = bugs.findIndex(bug => bug.id == action.payload.id);
      bugs[bugId].resolved = true;
    }
  }
})

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;

export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs, projects) => bugs.filter(bug => !bug.resolved)
)