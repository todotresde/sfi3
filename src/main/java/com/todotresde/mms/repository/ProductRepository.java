package com.todotresde.mms.repository;

import com.todotresde.mms.domain.ManufacturingOrder;
import com.todotresde.mms.domain.Product;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select distinct product from Product product left join fetch product.supplies")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.supplies where product.id =:id")
    Product findOneWithEagerRelationships(@Param("id") Long id);

    List<Product> findByManufacturingOrder(ManufacturingOrder manufacturingOrder);

    @Query("select distinct product from Product product " +
        "left join fetch product.supplies supplies " +
        "left join fetch supplies.supplyType supplyType " +
        "left join fetch supplyType.supplyTypeAttrs " +
        "WHERE product.manufacturingOrder.id = :manufacturingOrderId")
    List<Product> findAllWithEagerRelationshipsByManufacturingOrderId(@Param("manufacturingOrderId") Long manufacturingOrderId);

    @Modifying
    @Query(value = "DELETE FROM product_supply WHERE products_id =:id", nativeQuery = true)
    void deleteSupplyRelations(@Param("id") Long id);
}
