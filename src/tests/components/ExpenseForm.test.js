import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let wrapper;

beforeEach(() => {
    wrapper = shallow(<ExpenseForm />);
});

test("Should render ExpenseForm",
    () => {
        expect(wrapper).toMatchSnapshot();
    });

test("Should render ExpenseForm with expense date",
    () => {
        wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
        expect(wrapper).toMatchSnapshot();
    });

test("Should render error for invalid form submission",
    () => {
        expect(wrapper).toMatchSnapshot();
        wrapper.find("form").simulate("submit", { preventDefault: () => { } });
        expect(wrapper.state("error")).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });

test("Should render error for invalid amount submission",
    () => {
        expect(wrapper).toMatchSnapshot();
        wrapper.setState({
            description: "apples",
            amount: "99999999999999999999"
        });
        wrapper.find("form").simulate("submit", { preventDefault: () => { } });
        expect(wrapper.state("error")).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });

test("Should set description on input change",
    () => {
        const value = "Peepee";
        expect(wrapper).toMatchSnapshot();
        wrapper.find("input").at(0).simulate("change", {
            target: {
                value
            }
        });
        expect(wrapper.state("description")).toBe(value);
        expect(wrapper).toMatchSnapshot();
    });

test("Should set note on textarea change",
    () => {
        const value = "note changed";
        expect(wrapper).toMatchSnapshot();
        wrapper.find("textarea").simulate("change", {
            target: { value }
        });
        expect(wrapper.state("note")).toBe(value);
        expect(wrapper).toMatchSnapshot();
    });

test("Should set amount if valid input",
    () => {
        const value = "918237.32";
        expect(wrapper).toMatchSnapshot();
        wrapper.find("input").at(1).simulate("change", {
            target: { value }
        });
        expect(wrapper.state("amount")).toBe(value);
        expect(wrapper).toMatchSnapshot();
    });

test("Should not set amount if invalid input",
    () => {
        expect(wrapper).toMatchSnapshot();
        wrapper.find("input").at(1).simulate("change", {
            target: {
                value: "abc123"
            }
        });
        expect(wrapper.state("amount")).toBe("");
        expect(wrapper).toMatchSnapshot();
    });

test("Should call onSubmit prop for valid form submission",
    () => {
        const onSubmitSpy = jest.fn();
        wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
        expect(wrapper).toMatchSnapshot();
        wrapper.find("form").simulate("submit", { preventDefault: () => { } });
        expect(wrapper.state("error")).toBeUndefined();
        expect(onSubmitSpy).toHaveBeenLastCalledWith({
            description: expenses[0].description,
            amount: expenses[0].amount,
            createdAt: expenses[0].createdAt,
            note: expenses[0].note
        });
        expect(wrapper).toMatchSnapshot();
    });

test("Should set new date on date change",
    () => {
        const now = moment();
        expect(wrapper).toMatchSnapshot();
        wrapper.find("SingleDatePicker").prop("onDateChange")(now);
        expect(wrapper.state("createdAt")).toBe(now);
        expect(wrapper).toMatchSnapshot();
    });

test("Should set calendar focus on change",
    () => {
        wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused: true });
        expect(wrapper.state("calendarFocused")).toBeTruthy();
        wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused: false });
        expect(wrapper.state("calendarFocused")).toBeFalsy();
        expect(wrapper).toMatchSnapshot();
    });