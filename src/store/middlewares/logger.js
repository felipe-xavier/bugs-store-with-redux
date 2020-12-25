const logger = param => store => next => action => {
  console.log({...param, actionType: action.type});

  next(action);
}

export default logger;