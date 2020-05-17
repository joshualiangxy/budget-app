import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper, history, startEditExpense, startRemoveExpense;

beforeEach(() => {
    history = { push: jest.fn() };
    startEditExpense = jest.fn();
    startEditExpense.mockReturnValue(new Promise(resolve => resolve("test")));
    startRemoveExpense = jest.fn();
    startRemoveExpense.mockReturnValue(new Promise(resolve => resolve("test")));
    wrapper = shallow(<EditExpensePage 
        expense={expenses[0]}
        history={history}
        startEditExpense={startEditExpense}
        startRemoveExpense={startRemoveExpense}
    />);
});

test("Should render EditExpensePage",
    () => {
        expect(wrapper).toMatchSnapshot();
    });

test("Should handle editExpense",
    () => {
        return wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1])
            .then(() => {
                expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1]);
                expect(history.push).toHaveBeenLastCalledWith('/');
            });
    });

test("Should handle startRemoveExpense",
    () => {
        return wrapper.find("button").prop("onClick")()
            .then(() => {
                expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
                expect(history.push).toHaveBeenLastCalledWith('/');
            });
    });