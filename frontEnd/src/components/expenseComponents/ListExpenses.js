import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseService from "../../services/ExpenseService";

//Expense table component.
const ListExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  //Delete expense.
  const deleteExpense = (expenseID) => {
    if (
      window.confirm("Are you sure you would like to DELETE this category?")
    ) {
      ExpenseService.deleteExpense(expenseID)
        .then((response) => {
          console.log(response.data);
          getAllExpenses();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //Getting all expenses.
  const getAllExpenses = () => {
    ExpenseService.getAllExpenses()
      .then((response) => {
        setExpenses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  //Show table of expenses.
  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-5">
        <center>
          <h4 className="">Expenses</h4>
        </center>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Expense Date</th>
              <th scope="col">Date Modified</th>
              <th scope="col">Date Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.reverse().map((expense, x = 0) => (
              <tr key={expense.expenseID}>
                <th scope="row">{x + 1}</th>
                <td>K{expense.amount}</td>
                <td>{expense.category.categoryName}</td>
                <td>{new Date(expense.expenseDate).toDateString()}</td>
                <td>{new Date(expense.dateModified).toLocaleDateString()}</td>
                <td>{new Date(expense.dateCreated).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/edit-expense/${expense.expenseID}`}
                    className="btn btn-outline-secondary btn-sm me-md-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteExpense(expense.expenseID)}
                    className="btn btn-dbtn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListExpenses;
