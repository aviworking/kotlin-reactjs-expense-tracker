import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../services/CategoryService";

//Edit category form component.
const EditCategory = () => {
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [apiError, setApiError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //Update category.
  const updateCategory = (e) => {
    if (!(categoryName === "")) {
      e.preventDefault();
      const data = { categoryName };
      CategoryService.updateCategory(data, id)
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          setApiError(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    CategoryService.getCategoryById(id)
      .then((response) => {
        setCategory(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
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

  //Show edit category form.
  return (
    <>
      <div className="p-5 m-5 bg-light rounded-5">
        <h3 className="text-center">Edit Category</h3>
        <br></br>
        <h6 className="text-center">Category: {category.categoryName}</h6>
        <br></br>
        <div className="ms-5 me-5 p-5 card">
          <div className="container">
            <div className="card-body ms-5 me-5 ps-5 pe-5">
              <form>
                <div className="ms-5 me-5">
                  <label for="amount" className="form-label">
                    New Category Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="category name"
                    className="form-control mb-2"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  ></input>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={(e) => updateCategory(e)}
                    className="btn btn-primary mt-1"
                  >
                    Change
                  </button>
                  <Link
                    to="/"
                    className="btn btn-outline-danger me-md-2 mt-1 ms-1 "
                  >
                    Cancel
                  </Link>
                </div>
              </form>
              {errorDisplay()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
