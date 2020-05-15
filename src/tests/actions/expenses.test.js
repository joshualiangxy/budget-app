import { addExpense, removeExpense, editExpense } from "../../actions/expenses"

test("Should set up remove expense action object", 
    () => expect(removeExpense({ id: "cockandballtorture" }))
            .toEqual({ type: "REMOVE_EXPENSE", id: "cockandballtorture" }));

test("Should set up edit expense action object",
    () => expect(editExpense("peepee", { note: "poopoo" }))
            .toEqual({ type: "EDIT_EXPENSE", id: "peepee", updates: { note: "poopoo" } }));

test("Should set up add expense action object with provided values",
    () => {
        const expense = {
            description: "Cock",
            note: "and ball torture",
            amount: 123102948,
            createdAt: 1827318
        };
        expect(addExpense(expense)).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                ...expense,
                id: expect.any(String)
            }
        })
    }
);

test("Should set up add expense action object with provided values",
    () => expect(addExpense()).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            id: expect.any(String),
            description: "",
            note: "",
            amount: 0,
            createdAt: 0
        }
    }));