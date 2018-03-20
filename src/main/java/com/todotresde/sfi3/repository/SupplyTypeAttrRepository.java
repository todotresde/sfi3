package com.todotresde.sfi3.repository;

import com.todotresde.sfi3.domain.SupplyTypeAttr;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SupplyTypeAttr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyTypeAttrRepository extends JpaRepository<SupplyTypeAttr, Long> {

}
