package com.todotresde.sfi3.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SupplyTypeAttrValue.
 */
@Entity
@Table(name = "supply_type_attr_value")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SupplyTypeAttrValue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "value", nullable = false)
    private String value;

    @ManyToOne(optional = false)
    @NotNull
    private Product product;

    @ManyToOne(optional = false)
    @NotNull
    private Supply supply;

    @ManyToOne(optional = false)
    @NotNull
    private SupplyType supplyType;

    @ManyToOne(optional = false)
    @NotNull
    private SupplyTypeAttr supplyTypeAttr;

    @ManyToOne(optional = false)
    @NotNull
    private ManufacturingOrder manufacturingOrder;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public SupplyTypeAttrValue value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Product getProduct() {
        return product;
    }

    public SupplyTypeAttrValue product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Supply getSupply() {
        return supply;
    }

    public SupplyTypeAttrValue supply(Supply supply) {
        this.supply = supply;
        return this;
    }

    public void setSupply(Supply supply) {
        this.supply = supply;
    }

    public SupplyType getSupplyType() {
        return supplyType;
    }

    public SupplyTypeAttrValue supplyType(SupplyType supplyType) {
        this.supplyType = supplyType;
        return this;
    }

    public void setSupplyType(SupplyType supplyType) {
        this.supplyType = supplyType;
    }

    public SupplyTypeAttr getSupplyTypeAttr() {
        return supplyTypeAttr;
    }

    public SupplyTypeAttrValue supplyTypeAttr(SupplyTypeAttr supplyTypeAttr) {
        this.supplyTypeAttr = supplyTypeAttr;
        return this;
    }

    public void setSupplyTypeAttr(SupplyTypeAttr supplyTypeAttr) {
        this.supplyTypeAttr = supplyTypeAttr;
    }

    public ManufacturingOrder getManufacturingOrder() {
        return manufacturingOrder;
    }

    public SupplyTypeAttrValue manufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
        return this;
    }

    public void setManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
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
        SupplyTypeAttrValue supplyTypeAttrValue = (SupplyTypeAttrValue) o;
        if (supplyTypeAttrValue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplyTypeAttrValue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SupplyTypeAttrValue{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
