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
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @ManyToOne(optional = false)
    @NotNull
    private ManufacturingOrder manufacturingOrder;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "product_supply",
               joinColumns = @JoinColumn(name="products_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="supplies_id", referencedColumnName="id"))
    private Set<Supply> supplies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Product description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Product quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ManufacturingOrder getManufacturingOrder() {
        return manufacturingOrder;
    }

    public Product manufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
        return this;
    }

    public void setManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
    }

    public Set<Supply> getSupplies() {
        return supplies;
    }

    public Product supplies(Set<Supply> supplies) {
        this.supplies = supplies;
        return this;
    }

    public Product addSupply(Supply supply) {
        this.supplies.add(supply);
        supply.getProducts().add(this);
        return this;
    }

    public Product removeSupply(Supply supply) {
        this.supplies.remove(supply);
        supply.getProducts().remove(this);
        return this;
    }

    public void setSupplies(Set<Supply> supplies) {
        this.supplies = supplies;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", quantity=" + getQuantity() +
            "}";
    }
}
