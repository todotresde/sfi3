package com.todotresde.mms.repository;

import com.todotresde.mms.domain.LinearRegression;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LinearRegression entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LinearRegressionRepository extends JpaRepository<LinearRegression, Long> {

}
