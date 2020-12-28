import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { createSelector } from 'reselect';
import { apiCallBegan } from "./api";

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
      bugs.list.push(action.payload);
    },

    bugRemoved: (bugs, action) => {
      const bugId = bugs.list.findIndex(bug => bug.id == action.payload.id);
      if (bugId >= 0) bugs.list.splice(bugId, 1);
    },

    bugResolved: (bugs, action) => { 
      const bugId = bugs.list.findIndex(bug => bug.id == action.payload.id);
      if (bugId >= 0) bugs.list[bugId].resolved = true;
    },

    bugAssignedToUser: (bugs, action) => { 
      const bugId = bugs.list.findIndex(bug => bug.id == action.payload.id);
      if (bugId >= 0) bugs.list[bugId].userId = action.payload.userId;
    }
  }
})

// Computed State
const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.list.filter(bug => !bug.resolved)
)

const getAssigneeBugs = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.list.filter(bug => bug.userId === userId)
)

export { getAssigneeBugs, getUnresolvedBugs };

// Event Actions. Store Side
const { 
  bugAdded, 
  bugRemoved, 
  bugResolved, 
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
  bugAssignedToUser,
 } = slice.actions;

export default slice.reducer;

const url = "/bugs";

// Command Actions. Server side with Event calls to the store.
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  console.log(lastFetch);

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

  console.log(diffInMinutes);

  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      method: "get",
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onFail: bugsRequestFailed.type,
  }))
}

export const addBug = bug => apiCallBegan({
  url,
  data: bug,
  method: "post",
  onSuccess: bugAdded.type,
});

export const resolveBug = bugId => apiCallBegan({
  url: url + '/' + bugId,
  data: {resolved: true},
  method: "patch",
  onSuccess: bugResolved.type,
});

export const assignBugToUser = (bugId, userId) => apiCallBegan({
  url: url + '/' + bugId,
  data: {userId: userId},
  method: "patch",
  onSuccess: bugAssignedToUser.type,
})