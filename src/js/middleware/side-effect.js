let timeouts = {};

export default store => next => action => {
  if(action.sideEffect) {
    const {
      promise,
      timeoutGenerator,
      resolveType,
      rejectType
    } = action.sideEffect;

    if(promise) {
      promise.then((result) => {
        store.dispatch({
          type: resolveType,
          ...result
        });
      }).catch((error) => {
        store.dispatch({
          type: rejectType,
          error
        });
      });
    } else if(timeoutGenerator) {
      if(timeouts[action.type]) {
        clearTimeout[action.type];
        timeouts[action.type] = null;
      }

      timeouts[action.type] = timeoutGenerator(store.dispatch);
    }
  }

  return next(action);
}
