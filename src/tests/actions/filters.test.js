import moment from "moment";
import {
    setTextFilter, 
    sortByDate, 
    sortByAmount, 
    sortByName, 
    setStartDate, 
    setEndDate
} from "../../actions/filters";

test("Should generate set start date action object", 
    () => expect(setStartDate(moment(0))).toEqual({
        type: "SET_START_DATE",
        startDate: moment(0)
    }));

test("Should generate set end date action object", 
    () => expect(setEndDate(moment(0))).toEqual({
        type: "SET_END_DATE",
        endDate: moment(0)
    }));

test("Should generate set text filter action object",
    () => expect(setTextFilter("cock and ball torture")).toEqual({
        type: "SET_TEXT_FILTER",
        text: "cock and ball torture"
    }));

test("Should generate set text filter action object with default",
    () => expect(setTextFilter()).toEqual({
        type: "SET_TEXT_FILTER",
        text: ""
    }));

test("Should generate sort by date action object",
    () => expect(sortByDate()).toEqual({ type: "SORT_BY_DATE" }));

test("Should generate sort by amount action object",
    () => expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" }));

test("Should generate sort by name action object",
    () => expect(sortByName()).toEqual({ type: "SORT_BY_NAME" }));
