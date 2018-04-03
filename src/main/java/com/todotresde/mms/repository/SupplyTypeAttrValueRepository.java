package com.todotresde.mms.repository;

import com.todotresde.mms.domain.ManufacturingOrder;
import com.todotresde.mms.domain.Product;
import com.todotresde.mms.domain.Supply;
import com.todotresde.mms.domain.SupplyTypeAttrValue;
import org.springframework.data.repository.query.Param;
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
    List<SupplyTypeAttrValue> findByManufacturingOrderAndProductAndSupply(ManufacturingOrder manufacturingOrder, Product product, Supply supply);

    @Query("select distinct supplyTypeAttrValue from SupplyTypeAttrValue supplyTypeAttrValue " +
        "WHERE supplyTypeAttrValue.manufacturingOrder.id = :manufacturingOrderId")
    List<SupplyTypeAttrValue> findAllByManufacturingOrderId(@Param("manufacturingOrderId") Long manufacturingOrderId);
}
