package com.assignment.expenseTracker.controllers

import com.assignment.expenseTracker.entities.Expense
import com.assignment.expenseTracker.services.ExpenseService
import com.assignment.expenseTracker.utilities.RouteConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

/*
Expense Controller.
URL: https://localhost:8080/api/expense-tracker
 */
@CrossOrigin("*")
@RestController
@RequestMapping(RouteConstants.basePath)
class ExpenseController {

    @Autowired
    lateinit var expenseService: ExpenseService

    /*
    Reads all expenses.
    URL: https://localhost:8080/api/expense-tracker/expenses
    */
    @GetMapping(RouteConstants.expenses)
    fun readExpenses(): List<Expense> {
        return expenseService.readExpenses().sortedBy { x -> x.expenseDate }
    }

    /*
    Reads expense by key.
    URL: https://localhost:8080/api/expense-tracker/expenses/{id}
     */
    @GetMapping(RouteConstants.expensesByKey)
    fun readExpensesByKey(@PathVariable(value = "id") expenseID : Int): ResponseEntity<Expense> {
        return expenseService.readExpensesByKey(expenseID)
    }

    /*
    Creates an expense.
    URL: https://localhost:8080/api/expense-tracker/expenses/create
     */
    @PostMapping(RouteConstants.createExpense)
    fun createExpense(@RequestBody expense: Expense): ResponseEntity<Expense> {
        return expenseService.createExpense(expense)
    }

    /*
    Updates an expense.
    URL: https://localhost:8080/api/expense-tracker/categories/update/{id}
    */
    @PutMapping(RouteConstants.updateExpense)
    fun updateExpense(@PathVariable(value = "id") expenseID: Int,@RequestBody expense: Expense): ResponseEntity<Expense>{
        return expenseService.updateExpense(expenseID, expense)
    }

    /*
    Deletes an expense.
    URL: https://localhost:8080/api/expense-tracker/categories/delete/{id}
    */
    @DeleteMapping(RouteConstants.deleteExpense)
    fun deleteExpense(@PathVariable(value = "id") expenseID: Int): ResponseEntity<Expense>{
        return expenseService.deleteExpense(expenseID)
    }
}