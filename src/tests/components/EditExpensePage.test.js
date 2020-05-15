import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper, history, editExpense, removeExpense;

beforeEach(() => {
    history = { push: jest.fn() };
    editExpense = jest.fn();
    removeExpense = jest.fn();
    wrapper = shallow(<EditExpensePage 
        expense={expenses[0]}
        history={history}
        editExpense={editExpense}
        removeExpense={removeExpense}
    />);
});

test("Should render EditExpensePage",
    () => {
        expect(wrapper).toMatchSnapshot();
    });

test("Should handle editExpense",
    () => {
        wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1])
        expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1]);
        expect(history.push).toHaveBeenLastCalledWith('/');
    });

test("Should handle removeExpense",
    () => {
        wrapper.find("button").simulate("click");
        expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id);
        expect(history.push).toHaveBeenLastCalledWith('/');
    });