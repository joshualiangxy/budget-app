import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expenses', () => {
  const expenses = [];
  expect(getExpensesTotal(expenses)).toBe(0);
});

test('Should correctly add up a single expense', () => {
  expect(getExpensesTotal([expenses[0]])).toBe(expenses[0].amount);
});

test('Should correctly add up multiple expenses', () => {
  expect(getExpensesTotal(expenses)).toBe(169);
});
