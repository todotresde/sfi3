package com.todotresde.sfi3.service.dto;

import com.todotresde.sfi3.domain.ManufacturingOrder;
import com.todotresde.sfi3.domain.Product;
import com.todotresde.sfi3.domain.SupplyTypeAttrValue;

import java.util.ArrayList;
import java.util.List;

public class ManufacturingOrderDTO {
    private List<SupplyTypeAttrValue> supplyTypeAttrValues = new ArrayList<>();
    private ManufacturingOrder manufacturingOrder;
    private List<Product> products = new ArrayList<>();

    public List<SupplyTypeAttrValue> getSupplyTypeAttrValues() {
        return supplyTypeAttrValues;
    }

    public void setSupplyTypeAttrValues(List<SupplyTypeAttrValue> supplyTypeAttrValues) {
        this.supplyTypeAttrValues = supplyTypeAttrValues;
    }

    public ManufacturingOrder getManufacturingOrder() {
        return manufacturingOrder;
    }

    public void setManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        this.manufacturingOrder = manufacturingOrder;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
