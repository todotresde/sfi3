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
 * A Supply.
 */
@Entity
@Table(name = "supply")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Supply implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(optional = false)
    @NotNull
    private SupplyType supplyType;

    @ManyToMany(mappedBy = "supplies")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

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

    public Supply name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SupplyType getSupplyType() {
        return supplyType;
    }

    public Supply supplyType(SupplyType supplyType) {
        this.supplyType = supplyType;
        return this;
    }

    public void setSupplyType(SupplyType supplyType) {
        this.supplyType = supplyType;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Supply products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Supply addProduct(Product product) {
        this.products.add(product);
        product.getSupplies().add(this);
        return this;
    }

    public Supply removeProduct(Product product) {
        this.products.remove(product);
        product.getSupplies().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
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
        Supply supply = (Supply) o;
        if (supply.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supply.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Supply{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
