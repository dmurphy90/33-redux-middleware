let validateCategory = category => {
  if(!category._id || !category.name || !category.timestamp) {
    throw new Error('Validation Error: Category must include id, name, and timestamp');
  }
};

let validateExpense = expense => {
  if(!expense._id || !expense.name || !expense.timestamp) {
    throw new Error('Validation Error: Expense must include ID, name and timestamp');
  }
};

let initialState = {};

export default (state=initialState, action) => {
  let {type, payload} = action;
  let changedState, categoryId, categoryExpenses, updatedExpenses, updatedState;

  switch(type) {
  case 'CATEGORY_CREATE':
    validateCategory(payload);
    return {...state, [payload._id]: []};
  case 'CATEGORY_DELETE':
    validateCategory(payload);
    changedState = {...state};
    delete changedState[payload._id];
    return changedState;
  case 'EXPENSE_CREATE':
    validateExpense(payload);
    categoryId = payload.categoryId;
    categoryExpenses = state[categoryId];
    updatedExpenses = [...categoryExpenses, payload];
    return {...state, [categoryId]: updatedExpenses};;
  case 'EXPENSE_UPDATE':
    validateExpense(payload);
    categoryId = payload.categoryId;
    categoryExpenses = state[categoryId];
    updatedExpenses = categoryExpenses.map(expense => expense._id === payload._id ? payload : expense);
    return {...state, [categoryId]: updatedExpenses};;
  case 'EXPENSE_DELETE':
    validateExpense(payload);
    categoryId = payload.categoryId;
    updatedState = {...state};
    updatedState[categoryId] = state[categoryId].filter(expense => expense._id !== payload._id);
    return updatedState;
  case 'EXPENSE_RESET': return initialState;
  default: return state;
  }
};