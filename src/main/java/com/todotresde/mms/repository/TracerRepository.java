package com.todotresde.mms.repository;

import com.todotresde.mms.domain.*;
import com.todotresde.mms.service.dto.TracerTimeProjection;
import org.springframework.data.repository.query.Param;
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
    List<Tracer> findByLinearRegressionAndStatus(LinearRegression linearRegression, Integer status);
    List<Tracer> findByWorkStationAndStatusNot(WorkStation workstation, Integer status);
    List<Tracer> findByWorkStationAndEmployeeAndStatus(WorkStation workstation, Employee employee, Integer status);
    List<Tracer> findByWorkStationAndEmployeeAndStatusNot(WorkStation workstation, Employee employee, Integer status);
    List<Tracer> findByStatus(Integer status);
    List<Tracer> findByStatusNot(Integer status);
    List<Tracer> findByManufacturingOrder(ManufacturingOrder manufacturingOrder);
    List<Tracer> findByManufacturingOrderId(Long manufacturingOrderId);
    List<Tracer> findByStatusAndManufacturingOrderId(Integer status, Long manufacturingOrder);
    List<Tracer> findByStatusNotAndManufacturingOrderId(Integer status, Long manufacturingOrder);
    List<Tracer> findByLineAndWorkStationConfigAndWorkStationAndEmployeeAndStatus(Line line, WorkStationConfig workStationConfig, WorkStation workstation, Employee employee, Integer status);
    List<Tracer> findByLineAndWorkStationConfigAndWorkStationAndEmployeeAndSupplyAndStatusAndLinearRegressionIsNotNull(Line line, WorkStationConfig workStationConfig, WorkStation workstation, Employee employee, Supply supply, Integer status);

    Tracer findByWorkStationAndCode(WorkStation workstation, String code);
    Integer countByManufacturingOrder(ManufacturingOrder manufacturingOrder);
    Integer countByManufacturingOrderAndStatus(ManufacturingOrder manufacturingOrder, Integer status);

    //TODO - Change 0 and 1 to constants
    @Query(value = "SELECT tracer from Tracer tracer " +
        "WHERE tracer.workStation = :workStation AND ( tracer.status = 0 OR tracer.status = 1 )")
    List<Tracer> findByWorkStationAndOpen(@Param("workStation") WorkStation workStation);

    @Query(value = "SELECT tracer.employee.id as employeeId, tracer.id as tracerId, tracer.workStation.id as workStationId, tracer.supply.id as supplyId, supplyTypeAttrValue.supplyType.id as supplyTypeId, tracer.time as time, supplyTypeAttr.name as name, supplyTypeAttrValue.value as value " +
        "FROM Tracer tracer " +
        "JOIN tracer.supplyTypeAttrValues supplyTypeAttrValue " +
        "JOIN supplyTypeAttrValue.supplyTypeAttr supplyTypeAttr " +
        "WHERE tracer.status = 2 AND tracer.employee.id = :employeeId " +
        "ORDER BY tracer.employee.id, tracer.id, tracer.workStation.id, tracer.supply.id")
    List<TracerTimeProjection> findTracerTimesForEmployee(@Param("employeeId") Long employeeId);

    @Modifying
    @Query(value = "UPDATE Tracer set linearRegression = null ")
    void clearLineRegressions();
}
