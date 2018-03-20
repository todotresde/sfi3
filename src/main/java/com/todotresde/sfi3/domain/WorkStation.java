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
 * A WorkStation.
 */
@Entity
@Table(name = "work_station")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WorkStation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "short_name", nullable = false)
    private String shortName;

    @NotNull
    @Column(name = "ip", nullable = false)
    private String ip;

    @ManyToMany(mappedBy = "prevWorkStations")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WorkStationConfig> prevWorkStationConfigs = new HashSet<>();

    @ManyToMany(mappedBy = "nextWorkStations")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WorkStationConfig> nextWorkStationConfigs = new HashSet<>();

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

    public WorkStation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public WorkStation shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getIp() {
        return ip;
    }

    public WorkStation ip(String ip) {
        this.ip = ip;
        return this;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Set<WorkStationConfig> getPrevWorkStationConfigs() {
        return prevWorkStationConfigs;
    }

    public WorkStation prevWorkStationConfigs(Set<WorkStationConfig> workStationConfigs) {
        this.prevWorkStationConfigs = workStationConfigs;
        return this;
    }

    public WorkStation addPrevWorkStationConfig(WorkStationConfig workStationConfig) {
        this.prevWorkStationConfigs.add(workStationConfig);
        workStationConfig.getPrevWorkStations().add(this);
        return this;
    }

    public WorkStation removePrevWorkStationConfig(WorkStationConfig workStationConfig) {
        this.prevWorkStationConfigs.remove(workStationConfig);
        workStationConfig.getPrevWorkStations().remove(this);
        return this;
    }

    public void setPrevWorkStationConfigs(Set<WorkStationConfig> workStationConfigs) {
        this.prevWorkStationConfigs = workStationConfigs;
    }

    public Set<WorkStationConfig> getNextWorkStationConfigs() {
        return nextWorkStationConfigs;
    }

    public WorkStation nextWorkStationConfigs(Set<WorkStationConfig> workStationConfigs) {
        this.nextWorkStationConfigs = workStationConfigs;
        return this;
    }

    public WorkStation addNextWorkStationConfig(WorkStationConfig workStationConfig) {
        this.nextWorkStationConfigs.add(workStationConfig);
        workStationConfig.getNextWorkStations().add(this);
        return this;
    }

    public WorkStation removeNextWorkStationConfig(WorkStationConfig workStationConfig) {
        this.nextWorkStationConfigs.remove(workStationConfig);
        workStationConfig.getNextWorkStations().remove(this);
        return this;
    }

    public void setNextWorkStationConfigs(Set<WorkStationConfig> workStationConfigs) {
        this.nextWorkStationConfigs = workStationConfigs;
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
        WorkStation workStation = (WorkStation) o;
        if (workStation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), workStation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WorkStation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", shortName='" + getShortName() + "'" +
            ", ip='" + getIp() + "'" +
            "}";
    }
}
