import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, sortByName, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    sortByName = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            sortByName={sortByName}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
});

test("Should render ExpenseListFilters",
    () => expect(wrapper).toMatchSnapshot());

test("Should render ExpenseListFilters with alt data",
    () => {
        wrapper.setProps({ filters: altFilters });
        expect(wrapper).toMatchSnapshot()
    });

test("Should handle text change",
    () => {
        const value = "Food";
        const event = { target: { value } };
        wrapper.find("input").simulate("change", event);
        expect(setTextFilter).toHaveBeenLastCalledWith(value);
    });

test("Should sort by date",
    () => {
        wrapper.setProps({ filters: altFilters });
        const event = { target: { value: "date" } };
        wrapper.find("select").simulate("change", event);
        expect(sortByDate).toHaveBeenCalledTimes(1);
    });

test("Should sort by amount",
    () => {
        const event = { target: { value: "amount" } };
        wrapper.find("select").simulate("change", event);
        expect(sortByAmount).toHaveBeenCalledTimes(1);
    });

test("Should sort by name",
    () => {
        const event = { target: { value: "name" } };
        wrapper.find("select").simulate("change", event);
        expect(sortByName).toHaveBeenCalledTimes(1);
    });

test("Should handle date change",
    () => {
        const event = { startDate: moment(0), endDate: moment(0).add(4, 'd') };
        wrapper.find("DateRangePicker").prop("onDatesChange")(event);
        expect(setStartDate).toHaveBeenLastCalledWith(event.startDate);
        expect(setEndDate).toHaveBeenLastCalledWith(event.endDate);
    });

test("Should handle date focus changes",
    () => {
        expect(wrapper.state("calendarFocused")).toBe(null);
        wrapper.find("DateRangePicker").prop("onFocusChange")("startDate");
        expect(wrapper.state("calendarFocused")).toBe("startDate");
        wrapper.find("DateRangePicker").prop("onFocusChange")("endDate");
        expect(wrapper.state("calendarFocused")).toBe("endDate");
    });