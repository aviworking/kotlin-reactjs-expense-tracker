import { useEffect, useState } from "react";
import CategoryService from "../../services/CategoryService";
import ExpenseService from "../../services/ExpenseService";

//Create new expense component.
const CreateExpense = () => {
  const [categories, setCategories] = useState([]);
  const [expenseDate, setExpenseDate] = useState("");
  const [apiError, setApiError] = useState("");
  const [amount, setAmount] = useState(0);
  const [categoryID, setCategoryID] = useState("");

  //Save new expense.
  const saveExpense = (e) => {
    if (amount > 0 && expenseDate <= Date.now && !(expenseDate === "")) {
      e.preventDefault();
      const expense = { amount, expenseDate, categoryID };

      ExpenseService.createExpense(expense)
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          setApiError(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    CategoryService.getAllCategories()
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Display error messages.
  const errorDisplay = () => {
    if (apiError) {
      return (
        <>
          <hr></hr>
          <div className="ms-5 me-5 text-center" style={{ color: "red" }}>
            {apiError}
          </div>
          <hr></hr>
        </>
      );
    }
  };

  //Show create expense form.
  return (
    <>
      <div className="d-flex justify-content-center">
        <h5>Add Expense</h5>
      </div>

      <div className="d-flex justify-content-center">
        <form className="row g-3">
          <div className="col-auto">
            <label for="inlineFormInput" className="visually-hidden">
              Amount
            </label>
            <input
              required
              type="number"
              step={0.01}
              min={1}
              className="form-control mb-2"
              value={amount}
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>
          <div className="col-auto">
            <select
              required
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setCategoryID(e.target.value)}
            >
              <option key={0} value={0}>
                --Select Category--
              </option>
              {categories.map((category, x = 0) => (
                <option key={category.categoryID} value={category.categoryID}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <label for="inlineFormInput" className="visually-hidden">
              Expense Date
            </label>
            <input
              required
              type="dateTime-local"
              className="form-control mb-2"
              value={expenseDate}
              placeholder="Expense Date"
              onChange={(e) => setExpenseDate(e.target.value)}
            ></input>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-primary mb-3 "
              onClick={(e) => saveExpense(e)}
            >
              Create
            </button>
          </div>
        </form>
      </div>
      {errorDisplay()}
    </>
  );
};
export default CreateExpense;
