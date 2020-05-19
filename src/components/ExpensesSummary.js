import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({
  expenseCount,
  expenseWord,
  expenseTotal
}) => (
  <div className="page-header">
    <div className="content-container">
      <h1 className="page-header__title">
        Viewing <span className="bold">{expenseCount}</span> {expenseWord}
        {expenseCount === 0 ? (
          ''
        ) : (
          <span>
            {' '}
            totalling <span className="bold">{expenseTotal}</span>
          </span>
        )}
      </h1>
      <div className="page-header__actions">
        <Link className="button" to="/create">
          Add Expense
        </Link>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  const expenseCount = expenses.length;
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
  const expenseTotal = numeral(getExpensesTotal(expenses) / 100).format(
    '$0,0.00'
  );
  return { expenseCount, expenseWord, expenseTotal };
};

export default connect(mapStateToProps)(ExpensesSummary);
