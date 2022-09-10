import axios from "axios";

const GET_EXPENSES_URL = "http://localhost:8080/api/expense-tracker/expenses";

const CREATE_EXPENSES_URL =
  "http://localhost:8080/api/expense-tracker/expenses/create";

const UPDATE_EXPENSES_URL =
  "http://localhost:8080/api/expense-tracker/expenses/update/";

const GET_EXPENSES_BY_ID_URL =
  "http://localhost:8080/api/expense-tracker/expenses/";

const DELETE_EXPENSES_URL =
  "http://localhost:8080/api/expense-tracker/expenses/delete/";

//Expense service api requests
class ExpenseService {
  getAllExpenses() {
    return axios.get(GET_EXPENSES_URL);
  }

  createExpense(expense) {
    return axios.post(CREATE_EXPENSES_URL, expense);
  }

  getExpenseById(expenseID) {
    return axios.get(GET_EXPENSES_BY_ID_URL + expenseID);
  }

  updateExpense(data, expenseID) {
    return axios.put(UPDATE_EXPENSES_URL + expenseID, data);
  }

  deleteExpense(expenseID) {
    return axios.delete(DELETE_EXPENSES_URL + expenseID);
  }
}

export default new ExpenseService();
