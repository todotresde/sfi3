package com.todotresde.mms.repository;

import com.todotresde.mms.domain.Supply;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Supply entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupplyRepository extends JpaRepository<Supply, Long> {
	Supply findByName(String name);
    List<Supply> findByNameContaining(String name);
	Supply findOneByName(String name);
}
