package com.todotresde.mms.repository;

import com.todotresde.mms.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the LinearRegression entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LinearRegressionRepository extends JpaRepository<LinearRegression, Long> {
    @Query(value = "SELECT linearRegression from LinearRegression linearRegression " +
            "GROUP BY linearRegression.line, linearRegression.workStationConfig, linearRegression.workStation, " +
            " linearRegression.supply, linearRegression.employee")
    Page<LinearRegression> findAllGrouped(Pageable pageable);

    List<LinearRegression> findByLineAndWorkStationConfigAndWorkStationAndEmployee(Line line, WorkStationConfig workStationConfig, WorkStation workStation, Employee employee);
}
