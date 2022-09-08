package com.assignment.expenseTracker.repositories

import com.assignment.expenseTracker.entities.Expense
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/*
Expense Repository.
 */
@Repository
interface ExpenseRepository : JpaRepository<Expense, Int>