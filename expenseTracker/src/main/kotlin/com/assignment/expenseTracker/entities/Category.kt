package com.assignment.expenseTracker.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime
import javax.persistence.*

/*
Category Entity.
 */
@Entity(name = "category")
@Table(name = "categories")
class Category(

    //Primary Key of the Category Entity.
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "categoryID", nullable = false)
    var categoryID: Int = 0,

    //Category name.
    @Column(name = "categoryName", nullable = false, length = 60)
    var categoryName: String,

    //Expense Entity cardinality reference definition.
    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "categoryID")
    var expenses : MutableList<Expense> = mutableListOf<Expense>(),

): BaseEntity()
