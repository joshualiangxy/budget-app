import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

let wrapper = shallow(<ExpensesSummary expenses={[]} />);

test("Should render 0 expenses properly",
    () => {
        expect(wrapper).toMatchSnapshot();
    });

test("Should render 1 expense properly",
    () => {
        wrapper.setProps({ expenses: [expenses[0]] })
        expect(wrapper).toMatchSnapshot();
    });

test("Should render multiple expenses properly",
    () => {
        wrapper.setProps({ expenses })
        expect(wrapper).toMatchSnapshot();
    });
