package com.assignment.expenseTracker.services

import com.assignment.expenseTracker.entities.Expense
import com.assignment.expenseTracker.repositories.CategoryRepository
import com.assignment.expenseTracker.repositories.ExpenseRepository
import com.assignment.expenseTracker.utilities.ErrorConstant
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDateTime

/*
Expense Services.
 */
@Service
class ExpenseService {

    @Autowired
    lateinit var expenseRepository: ExpenseRepository

    @Autowired
    lateinit var categoryRepository: CategoryRepository

    //Reading all expenses.
    fun readExpenses(): List<Expense> {
        return expenseRepository.findAll()
    }

    //Read expense by key.
    fun readExpensesByKey(expenseID : Int): ResponseEntity<Expense> {
        if (expenseID <= 0){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.InvalidExpenseID)
        }

        val expense = expenseRepository.findById(expenseID)
            .orElseThrow {
                throw ResponseStatusException(HttpStatus.NOT_FOUND, ErrorConstant.ExpenseNotExisting)
            }

        return ResponseEntity.ok().body(expense)
    }

    //Creating new expense.
    fun createExpense(expense: Expense): ResponseEntity<Expense> {
        if(!isValidExpense(expense)){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.InvalidExpense)
       }

        if(categoryRepository.findById(expense.categoryID).isEmpty){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.InvalidCategory)
        }

        expenseRepository.save(expense)
        return ResponseEntity.status(HttpStatus.CREATED).body(expense)
    }

    //Updating an expense.
    fun updateExpense(expenseID: Int, expense: Expense) : ResponseEntity<Expense>{
        if(!isValidExpense(expense)){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.InvalidExpense)
        }

        if(categoryRepository.findById(expense.categoryID).isEmpty){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.InvalidCategory)
        }

        val expenseDetails = expenseRepository.findById(expenseID)
            .orElseThrow {
                ResponseStatusException(HttpStatus.NOT_FOUND, ErrorConstant.ExpenseNotExisting)
            }

        expenseDetails.expenseDate = expense.expenseDate
        expenseDetails.amount = expense.amount
        expenseDetails.categoryID = expense.categoryID
        expenseDetails.dateModified = LocalDateTime.now()

        expenseRepository.save(expenseDetails)

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }

    //Deleting an expense.
    fun deleteExpense(expenseID: Int): ResponseEntity<Expense>{
        if(expenseID <= 0){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.InvalidExpense)
        }

        val expense = expenseRepository.findById(expenseID)
            .orElseThrow {
                ResponseStatusException(HttpStatus.NOT_FOUND, ErrorConstant.ExpenseNotExisting)
            }

        expenseRepository.delete(expense)
        return ResponseEntity.ok(null)
    }

    //Verifying if expense is valid.
    private fun isValidExpense(expense: Expense): Boolean {
        if (expense.expenseDate > LocalDateTime.now() || expense.amount <= 0) {
            return false
        }
        return true
    }
}