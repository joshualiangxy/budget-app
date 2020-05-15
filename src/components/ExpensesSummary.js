import React from "react";
import numeral from "numeral";
import { connect } from "react-redux";
import getVisibleExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";

export class ExpensesSummary extends React.Component {

    message = () => {
        const expenses = this.props.expenses;
        const total = numeral(getExpensesTotal(expenses) / 100).format("$0,0.00");
        switch (expenses.length) {
            case 0:
                return `Viewing 0 expenses`;
            case 1:
                return `Viewing 1 expense totalling ${total}`;
            default:
                return `Viewing ${expenses.length} expenses totalling ${total}`;
        }
    };

    render() {
        return (
            <div>
                <h2>{this.message()}</h2>
            </div>
        );
    }
}

const mapStateToProps = state => ({ expenses: getVisibleExpenses(state.expenses, state.filters) });

export default connect(mapStateToProps)(ExpensesSummary);