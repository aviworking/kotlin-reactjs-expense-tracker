package com.assignment.expenseTracker.entities

import java.time.LocalDateTime
import javax.persistence.*

/*
Expense Entity.
 */
@Entity
@Table(name = "expenses")
class Expense(

    //Primary key of the Expense Entity.
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "expenseID", nullable = false)
    var expenseID: Int,

    //Date when expense occurred.
    @Column(name = "expenseDate", nullable = false)
    var expenseDate : LocalDateTime,

    //Expense amount.
    @Column(name = "amount", precision = 18, scale = 2, nullable = false)
    var amount: Double,

    //CategoryID column used to auto-populate category reference.
    //Foreign Key column.
    @Column(name = "categoryID")
    var categoryID: Int,

    //Category reference.
    @ManyToOne
    @JoinColumn(name = "categoryID", insertable = false, updatable = false)
    var category: Category? = null
) : BaseEntity()