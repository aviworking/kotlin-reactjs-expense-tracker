import axios from "axios";

const GET_CATEGORIES_URL =
  "http://localhost:8080/api/expense-tracker/categories";

const CREATE_CATEGORY_URL =
  "http://localhost:8080/api/expense-tracker/categories/create";

const GET_CATEGORY_BY_ID =
  "http://localhost:8080/api/expense-tracker/categories/";

const UPDATE_CATEGORY_URL =
  "http://localhost:8080/api/expense-tracker/categories/update/";

const DELETE_CATEGORY_URL =
  "http://localhost:8080/api/expense-tracker/categories/delete/";

//Category service api requests
class CategoryService {
  getAllCategories() {
    return axios.get(GET_CATEGORIES_URL);
  }

  createCategory(category) {
    return axios.post(CREATE_CATEGORY_URL, category);
  }

  getCategoryById(categoryID) {
    return axios.get(GET_CATEGORY_BY_ID + categoryID);
  }

  updateCategory(data, categoryID) {
    return axios.put(UPDATE_CATEGORY_URL + categoryID, data);
  }

  deleteCategory(categoryID) {
    return axios.delete(DELETE_CATEGORY_URL + categoryID);
  }
}

export default new CategoryService();
