import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((expenseOne, expenseTwo) => {
      switch (sortBy) {
        case 'date':
          return expenseTwo.createdAt - expenseOne.createdAt;
        case 'amount':
          return expenseTwo.amount - expenseOne.amount;
        case 'name':
          return expenseOne.description.localeCompare(expenseTwo.description);
      }
    });
};

export default getVisibleExpenses;
