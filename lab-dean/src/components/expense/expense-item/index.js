import React from 'react';
import {connect} from 'react-redux';
import {expenseUpdate, expenseDelete} from '../../../actions/expense-actions';
import {renderIf} from '../../../lib/utils';
import ExpenseForm from '../../expense/expense-form/index';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: this.props.expense ?
        this.props.expense :
        {
          name: '',
          price: 0,
          categoryId: this.props.categoryId,
        },
      editing: false,
    };

    this.handleEditing = this.handleEditing.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEditing(expense) {
    this.setState({
      editing: !this.state.editing,
    });
  }

  handleUpdate(expense) {
    this.setState({
      editing: !this.state.editing,
    });
    this.props.expenseItemExpenseUpdate(expense);
  }

  handleDelete() {
    this.props.expenseItemExpenseDelete(this.props.expense);
  }

  render() {
    return (
      <div className="expense-item" key={this.props.expense._id}>
        <h3 onDoubleClick={this.handleEditing}>{this.props.expense.name}</h3>
        <p>Price: ${this.props.expense.price}</p>
        <button type="button" onClick={this.handleDelete}>{this.props.buttonText}</button>
        {renderIf(this.state.editing, <ExpenseForm
          message="Updating Expense"
          className="expense-update"
          expense={this.props.expense}
          buttonText="Update Expense"
          onComplete={this.handleUpdate}/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses,
});

const mapDispatchToProps = (dispatch, getState) => ({
  expenseItemExpenseUpdate: expense => dispatch(expenseUpdate(expense)),
  expenseItemExpenseDelete: expense => dispatch(expenseDelete(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);