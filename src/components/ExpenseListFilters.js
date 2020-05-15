import React from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount, sortByName, setStartDate, setEndDate } from "../actions/filters";
import { DateRangePicker } from "react-dates";

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = calendarFocused => this.setState(() => ({ calendarFocused }));

    onSortChange = event => {
        switch (event.target.value) {
            case "date":
                this.props.sortByDate();
                break;
            case "amount":
                this.props.sortByAmount();
                break;
            case "name":
                this.props.sortByName();
                break;
        }
    };

    onTextChange = event => this.props.setTextFilter(event.target.value);

    render() {
        return (
            <div>
                <input 
                    type="text"
                    value={this.props.filters.text}
                    onChange={this.onTextChange}
                />
                <select 
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="name">Name</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({ filters: state.filters });

const mapDispatchToProps = dispatch => ({
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByName: () => dispatch(sortByName()),
    setTextFilter: text => dispatch(setTextFilter(text)),
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setEndDate: endDate => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);