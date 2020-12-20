// We have 3 actions for the Bug-tracker
// We can Add, Remove and Mark a bug as resolved.

import { createAction, createReducer } from '@reduxjs/toolkit';

// Action Creators
export const bugAdded = createAction("bugAdded")

export const bugRemoved = createAction("bugRemoved")

export const bugResolved = createAction("bugResolved")

// Reducer
let lastId = 0;

const newBug = description => ({
  id: ++lastId,
  description : description,
  resolved : false,
})

export default createReducer([], {
  [bugAdded.type]: (bugs, action) => { bugs.push(newBug(action.payload.description)) },

  [bugResolved.type]: (bugs, action) => { 
    const bugId = bugs.findIndex(bug => bug.id == action.payload.id);
    bugs[bugId].resolved = true;
   }

  // bugRemoved: (state, action) => {  }
})
