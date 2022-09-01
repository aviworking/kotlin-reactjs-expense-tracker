package com.assignment.expenseTracker.controllers

import com.assignment.expenseTracker.entities.Category
import com.assignment.expenseTracker.services.CategoryService
import com.assignment.expenseTracker.utilities.RouteConstants
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*

/*
Category Controller.
URL: https://localhost:8080/api/expense-tracker
 */
@CrossOrigin("*")
@RestController
@RequestMapping(RouteConstants.basePath)
class CategoryController {

    @Autowired
    lateinit var categoryService : CategoryService

    /*
    Reads all categories.
    URL: https://localhost:8080/api/expense-tracker/categories
     */
    @GetMapping(RouteConstants.categories)
    fun readCategories(): List<Category> {
        return categoryService.readCategories()
    }

    /*
    Reads category by key.
    URL: https://localhost:8080/api/expense-tracker/categories/{id}
     */
    @GetMapping(RouteConstants.categoriesByKey)
    fun readCategoryByKey(@PathVariable(value = "id") categoryID : Int): ResponseEntity<Category> {
        return categoryService.readCategoryByKey(categoryID)
    }

    /*
    Creates a category.
    URL: https://localhost:8080/api/expense-tracker/categories/create
     */
    @PostMapping(RouteConstants.createCategory)
    fun createCategory(@RequestBody category: Category): ResponseEntity<Category> {
        return categoryService.createCategory(category)
    }

    /*
    Updates a category.
    URL: https://localhost:8080/api/expense-tracker/categories/update/{id}
     */
    @PutMapping(RouteConstants.updateCategory)
    fun updateCategory(@PathVariable(value = "id") categoryID: Int, @Validated @RequestBody category : Category) : ResponseEntity<Category>{
        return categoryService.updateCategory(categoryID, category)
    }

    /*
    Deletes a category.
    URL: https://localhost:8080/api/expense-tracker/categories/delete/{id}
     */
    @DeleteMapping(RouteConstants.deleteCategory)
    fun deleteCategory(@PathVariable(value = "id") categoryID: Int): ResponseEntity<Category>{
        return categoryService.deleteCategory(categoryID)
    }
}