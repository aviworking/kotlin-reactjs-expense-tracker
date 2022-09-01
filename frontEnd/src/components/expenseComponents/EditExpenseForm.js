import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../services/CategoryService";
import ExpenseService from "../../services/ExpenseService";

//Edit expense form component.
const EditExpense = () => {
  const [currentExpCatName, setCurrentExpCatName] = useState("");
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState([]);
  const [expenseDate, setExpenseDate] = useState("");
  const [apiError, setApiError] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryID, setCategoryID] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  //Updating expense
  const updateExpense = (e) => {
    if (amount > 0 && expenseDate <= Date.now && !(expenseDate === "")) {
      e.preventDefault();
      const data = { amount, expenseDate, categoryID };

      ExpenseService.updateExpense(data, id)
        .then((response) => {
          console.log(response.data);
          navigate("/expenses");
        })
        .catch((error) => {
          setApiError(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    ExpenseService.getExpenseById(id)
      .then((response) => {
        setExpense(response.data);
        setCurrentExpCatName(response.data.category.categoryName);

        setCategoryID(response.data.category.categoryID);

        setAmount(response.data.amount);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //Getting all expense categories.
    CategoryService.getAllCategories()
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //Displaying error messages.
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

  //Show edit expense form.
  return (
    <>
      <div className="p-5 m-5 bg-light rounded-5">
        <h3 className="text-center">Edit Expense </h3>
        <br></br>
        <h6 className="text-center">Amount : K{expense.amount}</h6>
        <h6 className="text-center">Category : {currentExpCatName}</h6>
        <h6 className="text-center">
          Date : {new Date(expense.expenseDate).toDateString()}
        </h6>
        <br></br>
        <div className="ms-5 me-5 p-5 card">
          <div className="container">
            <div className="card-body ">
              <form>
                <div className="col-auto ps-5 pe-5">
                  <label for="amount" className="form-label">
                    New Amount
                  </label>
                  <input
                    required
                    type="number"
                    step={0.01}
                    min={1}
                    className="form-control"
                    value={amount}
                    placeholder="0.0"
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </div>
                <div className="col-auto ps-5 pe-5">
                  <label>New Category</label>

                  <select
                    required
                    placeholder="--Select Category--"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setCategoryID(e.target.value)}
                  >
                    <option key={0} value={categoryID}>
                      {" "}
                      {currentExpCatName}
                    </option>
                    {categories.map((category, x = 0) => (
                      <option
                        key={category.categoryID}
                        value={category.categoryID}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto ps-5 pe-5">
                  <label for="categoryName" className="form-label">
                    New Expense Date
                  </label>
                  <input
                    required
                    type="datetime-local"
                    value={expenseDate}
                    className="form-control"
                    placeholder="date"
                    onChange={(e) => setExpenseDate(e.target.value)}
                  ></input>
                </div>

                <button
                  onClick={(e) => updateExpense(e)}
                  className="btn btn-primary mt-1 ms-5"
                >
                  Change
                </button>
                <Link
                  to="/expenses"
                  className="btn btn-outline-danger me-md-2 mt-1 ms-1 "
                >
                  Cancel
                </Link>
              </form>
              {errorDisplay()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditExpense;
