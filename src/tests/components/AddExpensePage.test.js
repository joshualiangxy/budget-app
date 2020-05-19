import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

beforeEach(() => {
  startAddExpense = jest.fn();
  startAddExpense.mockReturnValue(new Promise(resolve => resolve()));
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
});

test('Should render AddExpensePage', () => expect(wrapper).toMatchSnapshot());

test('Should handle onSubmit', () => {
  return wrapper
    .find('ExpenseForm')
    .prop('onSubmit')(expenses[0])
    .then(() => {
      expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0]);
      expect(history.push).toHaveBeenLastCalledWith('/');
    });
});
