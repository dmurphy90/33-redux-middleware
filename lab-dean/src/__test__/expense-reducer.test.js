import reducer from '../reducers/expense';
require('jest');

describe('Expense Reducer', function() {
  it('Should return the initial state on first call', () => {
    expect(reducer([], {})).toEqual([]);
  });
});