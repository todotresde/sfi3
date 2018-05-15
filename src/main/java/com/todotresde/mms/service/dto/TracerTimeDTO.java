package com.todotresde.mms.service.dto;

public class TracerTimeDTO implements TracerTimeProjection {
    private Long employeeId;
    private Long tracerId;
    private Long workStationId;
    private Long supplyId;
    private Integer time;
    private String name;
    private String value;

    public TracerTimeDTO() {
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getTracerId() {
        return tracerId;
    }

    public void setTracerId(Long tracerId) {
        this.tracerId = tracerId;
    }

    public Long getWorkStationId() {
        return workStationId;
    }

    public void setWorkStationId(Long workStationId) {
        this.workStationId = workStationId;
    }

    public Long getSupplyId() {
        return supplyId;
    }

    public void setSupplyId(Long supplyId) {
        this.supplyId = supplyId;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
