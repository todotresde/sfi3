package com.todotresde.mms.repository;

import com.todotresde.mms.domain.ManufacturingOrder;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ManufacturingOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ManufacturingOrderRepository extends JpaRepository<ManufacturingOrder, Long> {

}
