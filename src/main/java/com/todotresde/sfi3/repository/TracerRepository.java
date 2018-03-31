package com.todotresde.sfi3.repository;

import com.todotresde.sfi3.domain.ManufacturingOrder;
import com.todotresde.sfi3.domain.Tracer;
import com.todotresde.sfi3.domain.WorkStation;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;

import static com.todotresde.sfi3.config.Constants.STATUS_CREATED;
import static com.todotresde.sfi3.config.Constants.STATUS_STARTED;


/**
 * Spring Data JPA repository for the Tracer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TracerRepository extends JpaRepository<Tracer, Long> {
    List<Tracer> findByWorkStation(WorkStation workstation);
    List<Tracer> findByWorkStationAndStatus(WorkStation workstation, Integer status);
    List<Tracer> findByStatus(Integer status);
    Tracer findByWorkStationAndCode(WorkStation workstation, String code);
    Integer countByManufacturingOrder(ManufacturingOrder manufacturingOrder);
    Integer countByManufacturingOrderAndStatus(ManufacturingOrder manufacturingOrder, Integer status);

    //TODO - Change 0 and 1 to constants
    @Query(value = "SELECT tracer from Tracer tracer WHERE tracer.workStation = :workStation AND ( tracer.status = 0 OR tracer.status = 1 )")
    List<Tracer> findByWorkStationAndOpen(@Param("workStation") WorkStation workStation);
}
