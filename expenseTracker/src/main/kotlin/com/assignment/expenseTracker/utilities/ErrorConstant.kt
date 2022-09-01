package com.assignment.expenseTracker.utilities

/*
Error Message Constants.
 */
object ErrorConstant {

    //Expense service error messages.
    const val InvalidExpense = "Invalid Expense."
    const val InvalidExpenseID = "Invalid Expense ID."
    const val ExpenseNotExisting = "Expense Does Not Exist."

    //Category service error messages.
    const val CategoryDuplicate = "Category Duplicate."
    const val InvalidCategory = "Invalid Category."
    const val InvalidCategoryID = "Invalid Category ID."
    const val CategoryNotExisting = "Category Does Not exist."
    const val CategoryHasDependants = "This category has one or more dependant expenses."
}