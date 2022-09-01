import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryService";

//Categories table component.
const ListCategories = () => {
  const [categories, setCategories] = useState([]);

  //Deleting a category.
  const deleteCategory = (categoryID) => {
    if (
      window.confirm("Are you sure you would like to DELETE this category?")
    ) {
      CategoryService.deleteCategory(categoryID)
        .then((response) => {
          console.log(response.data);
          getAllCategories();
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    }
  };

  //Getting all categories.
  const getAllCategories = () => {
    CategoryService.getAllCategories()
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //Table showing all categories.
  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-5">
        <center>
          <h4 className="">Expense Categories</h4>
        </center>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Date Modified</th>
              <th scope="col">Date Created</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, x = 0) => (
              <tr key={category.categoryID}>
                <th scope="row">{x + 1}</th>
                <td>{category.categoryName}</td>
                <td>{new Date(category.dateModified).toLocaleDateString()}</td>
                <td>{new Date(category.dateCreated).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/edit-category/${category.categoryID}`}
                    className="btn btn-outline-secondary btn-sm me-md-2"
                  >
                    <i class="bi bi-pen"></i>
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCategory(category.categoryID)}
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

export default ListCategories;
