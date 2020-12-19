# Simple implementation of Redux in JS.

This repository has a single file called src/myRedux/myRedux.js that exports the famous createStore function.

The remaining files are used to apply the redux in a use case, which includes a reducer, the actions, action types and the store initializer as well as the webpack module that wraps the JS files to be used by the index.html.

The example used to test is a Bug Tracker with a store like this:

``` javascript
[{
  id: integer,
  description : string,
  resolved : boolean
}]
```
