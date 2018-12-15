package com.todotresde.mms.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A LinearRegression.
 */
@Entity
@Table(name = "linear_regression")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LinearRegression implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "dimension", nullable = false)
    private Integer dimension;

    @NotNull
    @Column(name = "x", nullable = false)
    private Double x;

    @NotNull
    @Column(name = "beta_0", nullable = false)
    private Double beta0;

    @NotNull
    @Column(name = "beta_1", nullable = false)
    private Double beta1;

    @NotNull
    @Column(name = "cluster", nullable = false)
    private Integer cluster;

    @ManyToOne(optional = false)
    @NotNull
    private Line line;

    @ManyToOne(optional = false)
    @NotNull
    private WorkStationConfig workStationConfig;

    @ManyToOne(optional = false)
    @NotNull
    private WorkStation workStation;

    @ManyToOne(optional = false)
    @NotNull
    private Supply supply;

    @ManyToOne(optional = false)
    @NotNull
    private SupplyType supplyType;

    @ManyToOne(optional = false)
    @NotNull
    private Employee employee;

    @OneToMany(mappedBy = "linearRegression")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tracer> tracers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDimension() {
        return dimension;
    }

    public LinearRegression dimension(Integer dimension) {
        this.dimension = dimension;
        return this;
    }

    public void setDimension(Integer dimension) {
        this.dimension = dimension;
    }

    public Double getX() {
        return x;
    }

    public LinearRegression x(Double x) {
        this.x = x;
        return this;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getBeta0() {
        return beta0;
    }

    public LinearRegression beta0(Double beta0) {
        this.beta0 = beta0;
        return this;
    }

    public void setBeta0(Double beta0) {
        this.beta0 = beta0;
    }

    public Double getBeta1() {
        return beta1;
    }

    public LinearRegression beta1(Double beta1) {
        this.beta1 = beta1;
        return this;
    }

    public void setBeta1(Double beta1) {
        this.beta1 = beta1;
    }

    public Integer getCluster() {
        return cluster;
    }

    public LinearRegression cluster(Integer cluster) {
        this.cluster = cluster;
        return this;
    }

    public void setCluster(Integer cluster) {
        this.cluster = cluster;
    }

    public Line getLine() {
        return line;
    }

    public LinearRegression line(Line line) {
        this.line = line;
        return this;
    }

    public void setLine(Line line) {
        this.line = line;
    }

    public WorkStationConfig getWorkStationConfig() {
        return workStationConfig;
    }

    public LinearRegression workStationConfig(WorkStationConfig workStationConfig) {
        this.workStationConfig = workStationConfig;
        return this;
    }

    public void setWorkStationConfig(WorkStationConfig workStationConfig) {
        this.workStationConfig = workStationConfig;
    }

    public WorkStation getWorkStation() {
        return workStation;
    }

    public LinearRegression workStation(WorkStation workStation) {
        this.workStation = workStation;
        return this;
    }

    public void setWorkStation(WorkStation workStation) {
        this.workStation = workStation;
    }

    public Supply getSupply() {
        return supply;
    }

    public LinearRegression supply(Supply supply) {
        this.supply = supply;
        return this;
    }

    public void setSupply(Supply supply) {
        this.supply = supply;
    }

    public SupplyType getSupplyType() {
        return supplyType;
    }

    public LinearRegression supplyType(SupplyType supplyType) {
        this.supplyType = supplyType;
        return this;
    }

    public void setSupplyType(SupplyType supplyType) {
        this.supplyType = supplyType;
    }

    public Employee getEmployee() {
        return employee;
    }

    public LinearRegression employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Set<Tracer> getTracers() {
        return tracers;
    }

    public LinearRegression tracers(Set<Tracer> tracers) {
        this.tracers = tracers;
        return this;
    }

    public LinearRegression addTracer(Tracer tracer) {
        this.tracers.add(tracer);
        tracer.setLinearRegression(this);
        return this;
    }

    public LinearRegression removeTracer(Tracer tracer) {
        this.tracers.remove(tracer);
        tracer.setLinearRegression(null);
        return this;
    }

    public void setTracers(Set<Tracer> tracers) {
        this.tracers = tracers;
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
        LinearRegression linearRegression = (LinearRegression) o;
        if (linearRegression.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), linearRegression.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LinearRegression{" +
            "id=" + getId() +
            ", dimension=" + getDimension() +
            ", x=" + getX() +
            ", beta0=" + getBeta0() +
            ", beta1=" + getBeta1() +
            "}";
    }
}
