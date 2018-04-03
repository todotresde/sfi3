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
 * A SupplyTypeAttr.
 */
@Entity
@Table(name = "supply_type_attr")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupplyTypeAttr implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "supplyTypeAttrs")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SupplyType> supplyTypes = new HashSet<>();

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

    public SupplyTypeAttr name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SupplyType> getSupplyTypes() {
        return supplyTypes;
    }

    public SupplyTypeAttr supplyTypes(Set<SupplyType> supplyTypes) {
        this.supplyTypes = supplyTypes;
        return this;
    }

    public SupplyTypeAttr addSupplyType(SupplyType supplyType) {
        this.supplyTypes.add(supplyType);
        supplyType.getSupplyTypeAttrs().add(this);
        return this;
    }

    public SupplyTypeAttr removeSupplyType(SupplyType supplyType) {
        this.supplyTypes.remove(supplyType);
        supplyType.getSupplyTypeAttrs().remove(this);
        return this;
    }

    public void setSupplyTypes(Set<SupplyType> supplyTypes) {
        this.supplyTypes = supplyTypes;
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
        SupplyTypeAttr supplyTypeAttr = (SupplyTypeAttr) o;
        if (supplyTypeAttr.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyTypeAttr.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyTypeAttr{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
