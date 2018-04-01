package com.todotresde.sfi3.service.dto;


import com.todotresde.sfi3.domain.WorkStationConfig;

public class WorkStationConfigDTO extends WorkStationConfig {
    private Integer time;

    private Integer averageTime;

    public WorkStationConfigDTO(WorkStationConfig workStationConfig) {
        this.setId(workStationConfig.getId());
        this.setFirst(workStationConfig.isFirst());
        this.setLast(workStationConfig.isLast());
        this.setWorkStation(workStationConfig.getWorkStation());
        this.setSupplyTypes(workStationConfig.getSupplyTypes());
        this.setEmployees(workStationConfig.getEmployees());
        this.setPrevWorkStations(workStationConfig.getPrevWorkStations());
        this.setNextWorkStations(workStationConfig.getNextWorkStations());
        this.setRow(workStationConfig.getRow());
        this.setCol(workStationConfig.getCol());
        this.setLine(workStationConfig.getLine());
    }

    public Integer getTime() {
        return time;
    }

    public WorkStationConfigDTO time(Integer time) {
        this.time = time;
        return this;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Integer getAverageTime() {
        return averageTime;
    }

    public WorkStationConfigDTO averageTime(Integer averageTime) {
        this.averageTime = averageTime;
        return this;
    }

    public void setAverageTime(Integer averageTime) {
        this.averageTime = averageTime;
    }
}
