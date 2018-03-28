package com.todotresde.sfi3.service;

import com.todotresde.sfi3.domain.*;
import com.todotresde.sfi3.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product save(Product product) {
        return this.productRepository.save(product);
    }

    public List<Product> getByManufacturingOrder(ManufacturingOrder manufacturingOrder) {
        return this.productRepository.findByManufacturingOrder(manufacturingOrder);
    }

    public List<SupplyType> getSupplyTypes(Product product) {
        List<SupplyType> supplyTypes = new ArrayList<SupplyType>();

        for(Supply supply: product.getSupplies()){
            supplyTypes.add(supply.getSupplyType());
        }

        return supplyTypes;
    }

    public void delete(Product product) {
        //this.productRepository.deleteSupplyRelations(product.getId());
        this.productRepository.delete(product.getId());
    }

    public Supply nextSupply(Product product, Supply supply) {
        Supply nextSupply = null;
        Boolean foundSupply = false;

        if (supply != null) {
            for (Supply productSupply : product.getSupplies()) {
                if (foundSupply) {
                    nextSupply = productSupply;
                }
                if (productSupply.getId().equals(supply.getId())) {
                    foundSupply = true;
                }
            }
        }

        return nextSupply;
    }

}

