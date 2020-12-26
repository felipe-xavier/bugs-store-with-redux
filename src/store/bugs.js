import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Reducer
let lastId = 0;

const newBug = (description, userId) => ({
  id: ++lastId,
  description,
  resolved : false,
  userId,
})

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFatch: null,
  },
  reducers: {
    bugsReceived: (bugs, action) => { bugs.list = action.payload },

    bugAdded: (bugs, action) => { bugs.list.push(newBug(action.payload.description, action.payload.userId)) },

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
  bugs => bugs.filter(bug => bug.userId === userId)
)

export { getAssigneeBugs };
export { getUnresolvedBugs };
export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;
