const getExpensesTotal = expenses => expenses.reduce(
    (total, expense) => total + expense.amount, 0);

export default getExpensesTotal;