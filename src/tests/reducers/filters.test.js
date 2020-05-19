import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('Should set up default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

test('Should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
  const initialState = {
    text: '',
    sortBy: 'name',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  };
  const state = filtersReducer(initialState, { type: 'SORT_BY_DATE' });
  expect(initialState.sortBy).toBe('name');
  expect(state.sortBy).toBe('date');
});

test('Should set sortBy to name', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_NAME' });
  expect(state.sortBy).toBe('name');
});

test('Should set text filter', () => {
  const text = 'text filter';
  const state = filtersReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text,
  });
  expect(state.text).toBe(text);
});

test('Should set startDate filter', () => {
  const startDate = moment().subtract(1, 'd');
  const state = filtersReducer(undefined, {
    type: 'SET_START_DATE',
    startDate,
  });
  expect(state.startDate).toBe(startDate);
});

test('Should set endDate filter', () => {
  const endDate = moment().add(1, 'd');
  const state = filtersReducer(undefined, {
    type: 'SET_END_DATE',
    endDate,
  });
  expect(state.endDate).toBe(endDate);
});
