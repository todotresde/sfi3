package com.todotresde.mms.domain;

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
 * A Line.
 */
@Entity
@Table(name = "line")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Line implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "line")
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

    public Line name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<WorkStationConfig> getWorkStationConfigs() {
        return workStationConfigs;
    }

    public Line workStationConfigs(Set<WorkStationConfig> workStationConfigs) {
        this.workStationConfigs = workStationConfigs;
        return this;
    }

    public Line addWorkStationConfig(WorkStationConfig workStationConfig) {
        this.workStationConfigs.add(workStationConfig);
        workStationConfig.setLine(this);
        return this;
    }

    public Line removeWorkStationConfig(WorkStationConfig workStationConfig) {
        this.workStationConfigs.remove(workStationConfig);
        workStationConfig.setLine(null);
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
        Line line = (Line) o;
        if (line.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), line.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Line{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
