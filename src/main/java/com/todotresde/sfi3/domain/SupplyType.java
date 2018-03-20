package com.todotresde.sfi3.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SupplyType.
 */
@Entity
@Table(name = "supply_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupplyType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "supplyType")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Supply> supplies = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "supply_type_supply_type_attr",
               joinColumns = @JoinColumn(name="supply_types_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="supply_type_attrs_id", referencedColumnName="id"))
    private Set<SupplyTypeAttr> supplyTypeAttrs = new HashSet<>();

    @ManyToMany(mappedBy = "supplyTypes")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WorkStationConfig> workStationConfigs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SupplyType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Supply> getSupplies() {
        return supplies;
    }

    public SupplyType supplies(Set<Supply> supplies) {
        this.supplies = supplies;
        return this;
    }

    public SupplyType addSupply(Supply supply) {
        this.supplies.add(supply);
        supply.setSupplyType(this);
        return this;
    }

    public SupplyType removeSupply(Supply supply) {
        this.supplies.remove(supply);
        supply.setSupplyType(null);
        return this;
    }

    public void setSupplies(Set<Supply> supplies) {
        this.supplies = supplies;
    }

    public Set<SupplyTypeAttr> getSupplyTypeAttrs() {
        return supplyTypeAttrs;
    }

    public SupplyType supplyTypeAttrs(Set<SupplyTypeAttr> supplyTypeAttrs) {
        this.supplyTypeAttrs = supplyTypeAttrs;
        return this;
    }

    public SupplyType addSupplyTypeAttr(SupplyTypeAttr supplyTypeAttr) {
        this.supplyTypeAttrs.add(supplyTypeAttr);
        supplyTypeAttr.getSupplyTypes().add(this);
        return this;
    }

    public SupplyType removeSupplyTypeAttr(SupplyTypeAttr supplyTypeAttr) {
        this.supplyTypeAttrs.remove(supplyTypeAttr);
        supplyTypeAttr.getSupplyTypes().remove(this);
        return this;
    }

    public void setSupplyTypeAttrs(Set<SupplyTypeAttr> supplyTypeAttrs) {
        this.supplyTypeAttrs = supplyTypeAttrs;
    }

    public Set<WorkStationConfig> getWorkStationConfigs() {
        return workStationConfigs;
    }

    public SupplyType workStationConfigs(Set<WorkStationConfig> workStationConfigs) {
        this.workStationConfigs = workStationConfigs;
        return this;
    }

    public SupplyType addWorkStationConfig(WorkStationConfig workStationConfig) {
        this.workStationConfigs.add(workStationConfig);
        workStationConfig.getSupplyTypes().add(this);
        return this;
    }

    public SupplyType removeWorkStationConfig(WorkStationConfig workStationConfig) {
        this.workStationConfigs.remove(workStationConfig);
        workStationConfig.getSupplyTypes().remove(this);
        return this;
    }

    public void setWorkStationConfigs(Set<WorkStationConfig> workStationConfigs) {
        this.workStationConfigs = workStationConfigs;
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
        SupplyType supplyType = (SupplyType) o;
        if (supplyType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
