package com.todotresde.sfi3.repository;

import com.todotresde.sfi3.domain.Tracer;
import com.todotresde.sfi3.domain.WorkStation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Tracer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TracerRepository extends JpaRepository<Tracer, Long> {
    List<Tracer> findByWorkStation(WorkStation workstation);
    List<Tracer> findByWorkStationAndStatus(WorkStation workstation, Integer status);
    Tracer findByWorkStationAndCode(WorkStation workstation, String code);
}
