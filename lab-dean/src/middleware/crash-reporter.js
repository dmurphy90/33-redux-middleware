export default store => next => action => {
  try {
    return next(action);
  } catch(error) {
    throw error;
  }
};