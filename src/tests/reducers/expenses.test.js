import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("Should set default state",
    () => {
        const state = expensesReducer(undefined, { type: "@@INIT" });
        expect(state).toEqual([]);
    });

test("Should remove expense by id",
    () => {
        const state = expensesReducer(expenses, {
            type: "REMOVE_EXPENSE",
            id: "2"
        });
        expect(state).toEqual([expenses[0], expenses[2], expenses[3]]);
    });

test("Should not remove expenses if id not found",
    () => {
        const state = expensesReducer(expenses, {
            type: "REMOVE_EXPENSE",
            id: "129381"
        });
        expect(state).toEqual(expenses);
    });

test("Should add an expense",
    () => {
        const expense = {
            id: "123",
            description: "Gas bills",
            note: "gas bills",
            amount: 12983719,
            createdAt: 1231
        };
        const state = expensesReducer(expenses, {
            type: "ADD_EXPENSE",
            expense
        });
        expect(state).toEqual([...expenses, expense]);
    });

test("Should edit an expense", 
    () => {
        const updates = { description: "Food", note: "food" };
        const state = expensesReducer(expenses, {
            type: "EDIT_EXPENSE",
            id: "1",
            updates
        });
        expect(state).toEqual([{
            id: "1",
            description: "Food",
            note: "food",
            amount: 9,
            createdAt: 0
        }, ...(expenses.filter(expense => expense.id !== "1"))]);
    });

test("Should not edit expense if expense not found",
    () => {
        const updates = { description: "Food" };
        const state = expensesReducer(expenses, {
            type: "EDIT_EXPENSE",
            id: "129381",
            updates
        });
        expect(state).toEqual(expenses);
    });

test("Should set expenses",
    () => {
        const initialState = [{
            id: "123",
            description: "Gas bills",
            note: "gas bills",
            amount: 12983719,
            createdAt: 1231
        }];
        const state = expensesReducer(initialState, {
            type: "SET_EXPENSES",
            expenses
        });
        expect(state).toEqual(expenses);
    });