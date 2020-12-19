// Main Redux function 

export default function createStore(reducer) {
  let state;
  let listeners = []

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener())
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function() {
        listeners = listeners.filter(lstnr => lstnr !== listener)
    }
  }

  return {
    getState,
    dispatch,
    subscribe,
  }
}
