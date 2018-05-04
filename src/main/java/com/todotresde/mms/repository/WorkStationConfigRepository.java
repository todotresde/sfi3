package com.todotresde.mms.repository;

import com.todotresde.mms.domain.Line;
import com.todotresde.mms.domain.SupplyType;
import com.todotresde.mms.domain.WorkStation;
import com.todotresde.mms.domain.WorkStationConfig;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the WorkStationConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkStationConfigRepository extends JpaRepository<WorkStationConfig, Long> {
    @Query("select distinct work_station_config from WorkStationConfig work_station_config left join fetch work_station_config.supplyTypes left join fetch work_station_config.employees left join fetch work_station_config.prevWorkStations left join fetch work_station_config.nextWorkStations")
    List<WorkStationConfig> findAllWithEagerRelationships();

    @Query("select work_station_config from WorkStationConfig work_station_config left join fetch work_station_config.supplyTypes left join fetch work_station_config.employees left join fetch work_station_config.prevWorkStations left join fetch work_station_config.nextWorkStations where work_station_config.id =:id")
    WorkStationConfig findOneWithEagerRelationships(@Param("id") Long id);

    List<WorkStationConfig> findByLine(Line line);
    List<WorkStationConfig> findByLineAndFirst(Line line, Boolean first);
    List<WorkStationConfig> findByLineAndRow(Line line, Integer row);
    List<WorkStationConfig> findByLineAndPrevWorkStations(Line line, WorkStation workStation);
    WorkStationConfig findOneByLineAndRowAndCol(Line line, Integer row, Integer col);

    @Query("select distinct work_station_config from WorkStationConfig work_station_config " +
        "left join fetch work_station_config.supplyTypes supply_types " +
        "WHERE work_station_config.line = :line AND " +
        "work_station_config.row = :row AND " +
        "work_station_config.col > :col AND " +
        "(supply_types.id != :supplyTypeId OR supply_types.id is null)" +
        "order by work_station_config.col asc")
    List<WorkStationConfig> getByLineAndRowAndColGreaterThanAndNotSupplyTypeId(@Param("line") Line line, @Param("row") Integer row, @Param("col") Integer col, @Param("supplyTypeId") Long supplyTypeId);

    @Query("select distinct work_station_config from WorkStationConfig work_station_config " +
        "left join fetch work_station_config.supplyTypes supply_types " +
        "WHERE work_station_config.line = :line AND " +
        "work_station_config.row = :row AND " +
        "work_station_config.col > :col AND " +
        "supply_types.id is null " +
        "order by work_station_config.col asc")
    List<WorkStationConfig> getByLineAndRowAndColGreaterThanAndSupplyTypeIsNull(@Param("line") Line line, @Param("row") Integer row, @Param("col") Integer col);
}
