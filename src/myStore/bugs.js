// We have 3 actions for the Bug-tracker
// We can Add, Remove and Mark a bug as resolved.

// Action Types
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action Creators
export const bugAdded = description => ({
    type: BUG_ADDED,
    payload: {
        description,
    }
})

export const bugRemoved = id => ({
    type: BUG_REMOVED,
    payload: {
        id,
    }
})

export const bugResolved = id => ({
    type: BUG_RESOLVED,
    payload: {
        id,
    }
})

// Reducer
let lastId = 0;

const newBug = (description) => ({
  id: ++lastId,
  description : description,
  resolved : false,
})

export default function myReducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        newBug(action.payload.description)
      ];
    case BUG_REMOVED:
      return state.filter(bug => bug.id !== action.payload.id);

    case BUG_RESOLVED:
      return state.map(bug => action.payload.id !== bug.id ? bug : {...bug, resolved: true});

    default:
      state
  }
}