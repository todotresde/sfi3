package com.todotresde.sfi3.repository;

import com.todotresde.sfi3.domain.ManufacturingOrder;
import com.todotresde.sfi3.domain.SupplyTypeAttrValue;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the SupplyTypeAttrValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyTypeAttrValueRepository extends JpaRepository<SupplyTypeAttrValue, Long> {
    List<SupplyTypeAttrValue> findByManufacturingOrder(ManufacturingOrder manufacturingOrder);
}
