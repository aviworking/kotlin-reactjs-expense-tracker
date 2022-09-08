package com.assignment.expenseTracker.repositories

import com.assignment.expenseTracker.entities.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

/*
Category Repository.
 */

@Repository
interface CategoryRepository : JpaRepository<Category, Int>{

    //Checking if there is a category with the same name in the DB.
    @Query("select c from category c where lower(c.categoryName) like lower(concat(?1))")
    fun findByNameFree(categoryName:String): List<Category?>
}