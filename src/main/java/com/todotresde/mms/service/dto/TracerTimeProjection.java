package com.todotresde.mms.service.dto;

public interface TracerTimeProjection {
    Long getEmployeeId();

    void setEmployeeId(Long employeeId);

    Long getTracerId();

    void setTracerId(Long tracerId);

    Long getWorkStationId();

    void setWorkStationId(Long workStationId);

    Long getSupplyId();

    void setSupplyId(Long supplyId);

    Long getSupplyTypeId();

    void setSupplyTypeId(Long supplyTypeId);

    Integer getTime();

    void setTime(Integer time);

    String getName();

    void setName(String name);

    String getValue();

    void setValue(String value);
}
