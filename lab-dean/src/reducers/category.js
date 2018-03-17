let validateCategory = category => {
  if(!category._id || !category.name || !category.timestamp) {
    throw new Error('Validation Error: Category must include ID, name, and timestamp');
  }
};

let initialState = [];

export default (state=[], action) => {
  let {type, payload} = action;

  switch(type) {
  case 'CATEGORY_CREATE':
    validateCategory(payload);
    return [...state, payload];
  case 'CATEGORY_UPDATE':
    validateCategory(payload);
    return state.map(category => category._id === payload._id ? payload : category);
  case 'CATEGORY_DELETE':
    validateCategory(payload);
    return state.filter(category => category._id !== payload._id);
  case 'CATEGORY_RESET': return initialState;
  default: return state;
  }
};