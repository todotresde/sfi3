package com.todotresde.mms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A WorkStationConfig.
 */
@Entity
@Table(name = "work_station_config")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WorkStationConfig implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first")
    private Boolean first;

    @Column(name = "last")
    private Boolean last;

    @ManyToOne(optional = false)
    @NotNull
    private WorkStation workStation;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "work_station_config_supply_type",
               joinColumns = @JoinColumn(name="work_station_configs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="supply_types_id", referencedColumnName="id"))
    private Set<SupplyType> supplyTypes = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "work_station_config_employee",
               joinColumns = @JoinColumn(name="work_station_configs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="employees_id", referencedColumnName="id"))
    private Set<Employee> employees = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "work_station_config_prev_work_station",
               joinColumns = @JoinColumn(name="work_station_configs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="prev_work_stations_id", referencedColumnName="id"))
    private Set<WorkStation> prevWorkStations = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "work_station_config_next_work_station",
               joinColumns = @JoinColumn(name="work_station_configs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="next_work_stations_id", referencedColumnName="id"))
    private Set<WorkStation> nextWorkStations = new HashSet<>();

    @Column(name = "row")
    private Integer row;

    @Column(name = "col")
    private Integer col;

    @ManyToOne(optional = false)
    @NotNull
    private Line line;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isFirst() {
        return first;
    }

    public WorkStationConfig first(Boolean first) {
        this.first = first;
        return this;
    }

    public void setFirst(Boolean first) {
        this.first = first;
    }

    public Boolean isLast() {
        return last;
    }

    public WorkStationConfig last(Boolean last) {
        this.last = last;
        return this;
    }

    public void setLast(Boolean last) {
        this.last = last;
    }

    public WorkStation getWorkStation() {
        return workStation;
    }

    public WorkStationConfig workStation(WorkStation workStation) {
        this.workStation = workStation;
        return this;
    }

    public void setWorkStation(WorkStation workStation) {
        this.workStation = workStation;
    }

    public Set<SupplyType> getSupplyTypes() {
        return supplyTypes;
    }

    public WorkStationConfig supplyTypes(Set<SupplyType> supplyTypes) {
        this.supplyTypes = supplyTypes;
        return this;
    }

    public WorkStationConfig addSupplyType(SupplyType supplyType) {
        this.supplyTypes.add(supplyType);
        supplyType.getWorkStationConfigs().add(this);
        return this;
    }

    public WorkStationConfig removeSupplyType(SupplyType supplyType) {
        this.supplyTypes.remove(supplyType);
        supplyType.getWorkStationConfigs().remove(this);
        return this;
    }

    public void setSupplyTypes(Set<SupplyType> supplyTypes) {
        this.supplyTypes = supplyTypes;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public WorkStationConfig employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public WorkStationConfig addEmployee(Employee employee) {
        this.employees.add(employee);
        employee.getWorkStationConfigs().add(this);
        return this;
    }

    public WorkStationConfig removeEmployee(Employee employee) {
        this.employees.remove(employee);
        employee.getWorkStationConfigs().remove(this);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<WorkStation> getPrevWorkStations() {
        return prevWorkStations;
    }

    public WorkStationConfig prevWorkStations(Set<WorkStation> workStations) {
        this.prevWorkStations = workStations;
        return this;
    }

    public WorkStationConfig addPrevWorkStation(WorkStation workStation) {
        this.prevWorkStations.add(workStation);
        workStation.getPrevWorkStationConfigs().add(this);
        return this;
    }

    public WorkStationConfig removePrevWorkStation(WorkStation workStation) {
        this.prevWorkStations.remove(workStation);
        workStation.getPrevWorkStationConfigs().remove(this);
        return this;
    }

    public void setPrevWorkStations(Set<WorkStation> workStations) {
        this.prevWorkStations = workStations;
    }

    public Set<WorkStation> getNextWorkStations() {
        return nextWorkStations;
    }

    public WorkStationConfig nextWorkStations(Set<WorkStation> workStations) {
        this.nextWorkStations = workStations;
        return this;
    }

    public WorkStationConfig addNextWorkStation(WorkStation workStation) {
        this.nextWorkStations.add(workStation);
        workStation.getNextWorkStationConfigs().add(this);
        return this;
    }

    public WorkStationConfig removeNextWorkStation(WorkStation workStation) {
        this.nextWorkStations.remove(workStation);
        workStation.getNextWorkStationConfigs().remove(this);
        return this;
    }

    public void setNextWorkStations(Set<WorkStation> workStations) {
        this.nextWorkStations = workStations;
    }

    public WorkStationConfig col(Integer col) {
        this.col = col;
        return this;
    }

    public void setCol(Integer col) {
        this.col = col;
    }

    public Integer getCol() {
        return this.col;
    }

    public WorkStationConfig row(Integer row) {
        this.row = row;
        return this;
    }

    public void setRow(Integer row) {
        this.row = row;
    }

    public Integer getRow() {
        return this.row;
    }

    public Line getLine() {
        return line;
    }

    public WorkStationConfig line(Line line) {
        this.line = line;
        return this;
    }

    public void setLine(Line line) {
        this.line = line;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WorkStationConfig workStationConfig = (WorkStationConfig) o;
        if (workStationConfig.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), workStationConfig.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WorkStationConfig{" +
            "id=" + getId() +
            ", first='" + isFirst() + "'" +
            ", last='" + isLast() + "'" +
            "}";
    }
}
