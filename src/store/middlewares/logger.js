const logger = param => store => next => action => {
  console.log({...param, actionType: action.type});

  return next(action);
}

export default logger;