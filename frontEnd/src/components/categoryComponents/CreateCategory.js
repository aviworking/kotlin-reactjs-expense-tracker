import { useState } from "react";
import CategoryService from "../../services/CategoryService";

//Create category component.
const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [apiError, setApiError] = useState("");

  //Saving new category.
  const saveCategory = (e) => {
    if (!(categoryName === "")) {
      e.preventDefault();
      const category = { categoryName };

      CategoryService.createCategory(category)
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          setApiError(error.response.data.message);
        });
    }
  };

  //Displaying Error messages.
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

  //Show create category form.
  return (
    <>
      <div className="d-flex justify-content-center">
        <h5>Add Category</h5>
      </div>

      <div className="d-flex justify-content-center">
        <form className="row g-3">
          <div className="col-auto">
            <label className="visually-hidden">Category</label>
            <input
              required
              type="text"
              placeholder="category name"
              className="form-control mb-2"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            ></input>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-primary mb-3"
              onClick={(e) => saveCategory(e)}
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
export default CreateCategory;
