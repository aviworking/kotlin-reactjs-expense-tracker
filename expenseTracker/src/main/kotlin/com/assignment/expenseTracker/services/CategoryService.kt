package com.assignment.expenseTracker.services

import com.assignment.expenseTracker.entities.Category
import com.assignment.expenseTracker.repositories.CategoryRepository
import com.assignment.expenseTracker.utilities.ErrorConstant
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDateTime

/*
Category Services.
 */
@Service
class CategoryService {

    @Autowired
    lateinit var categoryRepository: CategoryRepository

    //Reads all categories/
    fun readCategories(): List<Category> {
        return categoryRepository.findAll().sortedBy { it.categoryName }
    }

    //Reads category by key.
    fun readCategoryByKey(categoryID : Int): ResponseEntity<Category> {
        if(categoryID <= 0) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.InvalidCategoryID)
        }

        val category = categoryRepository.findById(categoryID)
            .orElseThrow {
                ResponseStatusException(HttpStatus.NOT_FOUND,ErrorConstant.CategoryNotExisting)
            }
        return ResponseEntity.ok().body(category)
    }

    //Creates new category.
    fun createCategory(category: Category): ResponseEntity<Category> {
        if(isCategoryDuplicate(category)){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.CategoryDuplicate)
        }

        categoryRepository.save(category)
        return ResponseEntity.status(HttpStatus.CREATED).body(category)
    }

    //Updates a category.
    fun updateCategory(categoryID: Int, category : Category) : ResponseEntity<Category>{
        if(isCategoryDuplicate(category)){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.CategoryDuplicate)
        }

        //Verifying whether the category exists or not.
        val categoryDetails = categoryRepository.findById(categoryID)
            .orElseThrow {
                ResponseStatusException(
                    HttpStatus.NOT_FOUND,ErrorConstant.CategoryNotExisting)
            }

        categoryDetails.categoryName = category.categoryName
        categoryDetails.dateModified = LocalDateTime.now()
        categoryRepository.save(categoryDetails)

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null)
    }

    //Deletes a category.
    fun deleteCategory(categoryID: Int): ResponseEntity<Category>{
        if(categoryID <= 0){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.InvalidCategoryID )
        }

        val category = categoryRepository.findById(categoryID)
            .orElseThrow {
                ResponseStatusException(HttpStatus.NOT_FOUND, ErrorConstant.CategoryNotExisting)
            }

        if (category.expenses.isNotEmpty()){
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, ErrorConstant.CategoryHasDependants)
        }

        categoryRepository.delete(category)
        return ResponseEntity.ok(null)
    }

    //Verifying whether the category name is a duplicate or not.
    private fun isCategoryDuplicate(category: Category): Boolean{

        if (categoryRepository.findByNameFree(category.categoryName).isEmpty()){
            return false
        }
        return true
    }
}