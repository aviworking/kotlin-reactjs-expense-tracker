package com.assignment.expenseTracker.entities

import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.MappedSuperclass

@MappedSuperclass
abstract class BaseEntity (
    //Date Created.
    @Column(name = "dateCreated", nullable = true)
    var dateCreated: LocalDateTime = LocalDateTime.now(),

    //Date Modified.
    @Column(name = "dateModified", nullable = true)
    var dateModified: LocalDateTime = LocalDateTime.now()
        )