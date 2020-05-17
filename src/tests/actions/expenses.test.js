import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import expenses from "../fixtures/expenses";
import { addExpense, removeExpense, editExpense, startAddExpense } from "../../actions/expenses";

const createMockStore = configureMockStore([thunk]);

test("Should set up remove expense action object", 
    () => expect(removeExpense({ id: "9128" }))
            .toEqual({ type: "REMOVE_EXPENSE", id: "9128" }));

test("Should set up edit expense action object",
    () => expect(editExpense("123", { note: "apples" }))
            .toEqual({ type: "EDIT_EXPENSE", id: "123", updates: { note: "apples" } }));

test("Should set up add expense action object with provided values",
    () => {
        const expense = expenses[2];
        expect(addExpense(expense)).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                ...expense,
                id: expect.any(String)
            }
        })
    });

test("Should add expense to database and store",
    () => {
        const store = createMockStore({});
        const expenseData = {
            description: "Dog",
            amount: 6000,
            note: "I like dogs",
            createdAt: 401239
        };
        
        return store.dispatch(startAddExpense(expenseData))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: "ADD_EXPENSE",
                    expense: {
                        id: expect.any(String),
                        ...expenseData
                    }
                });
                
                return database.ref(`expenses/${actions[0].expense.id}`).once("value");
            }).then(snapshot => expect(snapshot.val()).toEqual(expenseData));
    });

test("Should add expense with defaults to database and store",
    () => {
        const store = createMockStore({});
        return store.dispatch(startAddExpense())
            .then(() => {
                const actions = store.getActions();
                const expense = {
                    description: "",
                    note: "",
                    amount: 0,
                    createdAt: 0
                }
                expect(actions[0]).toEqual({
                    type: "ADD_EXPENSE",
                    expense: {
                        id: expect.any(String),
                        ...expense
                    }
                });

                return database.ref(`expenses/${actions[0].expense.id}`).once("value");
            }).then(snapshot => expect(snapshot.val()).toEqual(expense));
    });