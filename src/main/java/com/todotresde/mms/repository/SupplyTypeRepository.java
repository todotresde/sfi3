package com.todotresde.mms.repository;

import com.todotresde.mms.domain.SupplyType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the SupplyType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyTypeRepository extends JpaRepository<SupplyType, Long> {
    @Query("select distinct supply_type from SupplyType supply_type left join fetch supply_type.supplyTypeAttrs")
    List<SupplyType> findAllWithEagerRelationships();

    @Query("select supply_type from SupplyType supply_type left join fetch supply_type.supplyTypeAttrs where supply_type.id =:id")
    SupplyType findOneWithEagerRelationships(@Param("id") Long id);

    SupplyType findByName(String name);

}
