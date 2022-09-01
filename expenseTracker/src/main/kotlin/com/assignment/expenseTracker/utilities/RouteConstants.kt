package com.assignment.expenseTracker.utilities

/*
Route Constants.
 */
object RouteConstants{

    //Api base route.
    const val basePath = "api/expense-tracker"

    //Category routes
    const val categories = "/categories"
    const val categoriesByKey = "/categories/{id}"
    const val createCategory = "/categories/create";
    const val updateCategory = "/categories/update/{id}";
    const val deleteCategory = "/categories/delete/{id}";

    //Expense routes
    const val expenses = "/expenses";
    const val expensesByKey = "/expenses/{id}";
    const val createExpense = "/expenses/create";
    const val updateExpense = "/expenses/update/{id}";
    const val deleteExpense = "/expenses/delete/{id}";
}