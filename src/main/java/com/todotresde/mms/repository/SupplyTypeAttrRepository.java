package com.todotresde.mms.repository;

import com.todotresde.mms.domain.SupplyTypeAttr;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SupplyTypeAttr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyTypeAttrRepository extends JpaRepository<SupplyTypeAttr, Long> {

}
