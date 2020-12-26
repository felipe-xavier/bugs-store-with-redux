import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { createSelector } from 'reselect';
import { apiCallBegun } from "./api";

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
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugsReceived: (bugs, action) => { 
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugAdded: (bugs, action) => {
      const { description, userId } = action.payload;
      bugs.list.push(newBug(description, userId));
    },

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

export { getAssigneeBugs, getUnresolvedBugs };
export const { 
  bugAdded, 
  bugRemoved, 
  bugResolved, 
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
 } = slice.actions;

export default slice.reducer;

const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  console.log(lastFetch);

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegun({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onFail: bugsRequestFailed.type,
  }))
}
