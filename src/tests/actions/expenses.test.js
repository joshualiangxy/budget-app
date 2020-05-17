import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import expenses from "../fixtures/expenses";
import {
    addExpense,
    startAddExpense,
    removeExpense,
    startRemoveExpense,
    editExpense,
    setExpenses,
    startSetExpenses
} from "../../actions/expenses";

const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    return database.ref("expenses").set(expensesData);
});

test("Should set up remove expense action object", 
    () => expect(removeExpense({ id: "9128" }))
            .toEqual({ type: "REMOVE_EXPENSE", id: "9128" }));

test("Should remove expenses from firebase",
    () => {
        const store = createMockStore({});
        return store.dispatch(startRemoveExpense({ id: expenses[0].id }))
            .then(() => database
                .ref(`expenses/${expenses[0].id}`)
                .once("value"))
            .then(snapshot => {
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: "REMOVE_EXPENSE",
                    id: expenses[0].id
                });
                expect(snapshot.val()).toBeNull();
            });
    });

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
        const expense = {
            description: "",
            note: "",
            amount: 0,
            createdAt: 0
        };

        return store.dispatch(startAddExpense())
            .then(() => {
                const actions = store.getActions();
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

test("Should set up set expense action object with data",
    () => {
        const action = setExpenses(expenses);
        expect(action).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
    });

test("Should fetch expenses from firebase",
    () => {
        const store = createMockStore({});
        return store.dispatch(startSetExpenses())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual({
                    type: "SET_EXPENSES",
                    expenses
                });
            });
    });