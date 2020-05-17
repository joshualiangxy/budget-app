import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {

    editExpense = expense => this.props.startEditExpense(this.props.expense.id, expense)
        .then(() => this.props.history.push('/'));

    removeExpense = () => this.props.startRemoveExpense(this.props.expense.id)
        .then(() => this.props.history.push('/'));

    render() {
        return (
            <div>
                <h2>Edit Expense</h2>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.editExpense}
                />
                <button 
                    onClick={this.removeExpense}>Remove</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: id => dispatch(startRemoveExpense({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);